const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))
const jwt = require('jwt-simple')
const passport = require('passport')
const ExtractJwt = require('passport-jwt').ExtractJwt
const JwtStrategy = require('passport-jwt').Strategy
const SECRET = 'shadow'
const cloudinary = require('cloudinary').v2
const con = require('../db/server')

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: SECRET
}

const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
  if (payload.sub === 'romeo') { done(null, true) } else { done(null, false) }
})
passport.use(jwtAuth)
const requireJWTAuth = passport.authenticate('jwt', { session: false })
app.get('/', requireJWTAuth, (req, res) => {
  const usertoken = req.headers.authorization
  const decoded = jwt.decode(usertoken, SECRET)
  res.send(decoded.username)
})
app.get('/user', requireJWTAuth, (req, res) => {
  const usertoken = req.headers.authorization
  const decoded = jwt.decode(usertoken, SECRET)
  con.query('SELECT m_id,m_name,m_username,m_image FROM members WHERE m_id = ?', [decoded.id], (_err, reqer) => {
    res.send({ user: reqer[0] })
  })
})
app.get('/logout', requireJWTAuth, (req, res) => {
  const usertoken = req.headers.authorization
  jwt.destroy(usertoken)
  res.send('logout')
})
const loginMiddleWare = (req, res, next) => {
  con.query('SELECT m_id,m_username FROM members WHERE m_username = ? AND m_password = ?', [req.body.username, req.body.password], (err, reqer) => {
    console.log(req.body)
    if (err) {
      res.send('error')
    } else if (reqer.length > 0) {
      req.id = reqer[0].m_id
      next()
    } else {
      console.log(reqer.length)
      res.send('error')
    }
  })
}
app.post('/login', loginMiddleWare, (req, res) => {
  const payload = {
    sub: 'romeo',
    username: req.body.username,
    id: req.id,
    iat: new Date().getTime()
  }
  res.send({ token: jwt.encode(payload, SECRET) })
})
app.post('/register', (req, res) => {
  if (req.body.registerName === undefined) {
    res.send('name')
  } else if (req.body.registerEmail === undefined) {
    res.send('email')
  } else if (req.body.registerPassword === undefined) {
    res.send('password')
  } else {
    con.query('SELECT m_id,m_name,m_username FROM members WHERE m_username = ?', [req.body.registerEmail], (_error, reqerreg) => {
      if (_error) {
        res.send('_erroror')
      } else if (reqerreg.length === 0) {
        con.query('INSERT INTO members (m_name,m_username,m_password) VALUES (?,?,?)', [req.body.registerName, req.body.registerEmail, req.body.registerPassword], (_err, reqer) => {
          if (_err) {
            res.send('err')
          } else {
            res.send('success')
          }
        })
      } else {
        res.send('match')
      }
    })
  }
})
cloudinary.config({
  cloud_name: 'dgoffpdxx',
  api_key: '282999112639611',
  api_secret: 'KhoVhcrnN9GbmHdgHpq_jEK4NPw'
})
app.post('/post', requireJWTAuth, (req, res) => {
  const usertoken = req.headers.authorization
  const decoded = jwt.decode(usertoken, SECRET)
  console.log(req.body.title)
  let des = req.body.title
  let hashtag = des.match(/\B#\w\w+\b/g)
  console.log(hashtag)
  if (hashtag !== null && hashtag.length > 0) {
    des = des.replace(/#[A-Za-z0-9]*/g, '').trim()
    hashtag.forEach((h) => {
      con.query('SELECT * FROM hashtag WHERE h_name = ?', [h], (_err, reqer1) => {
        if (reqer1.length === 0) {
          con.query('INSERT INTO hashtag (h_name) VALUES (?)', [h], (_err, reqer2) => {
            console.log('insert hashtag')
          })
        } else {
          con.query('UPDATE hashtag SET h_count = ? WHERE h_id = ?', [reqer1[0].h_count + 1, reqer1[0].h_id], (_err, reqer3) => {
            console.log('UPDATE HASHTAG')
          })
        }
      })
    })
    hashtag = hashtag.join(',')
    hashtag = hashtag.replace(/#/g, '')
  } else {
    hashtag = ''
  }
  //   console.log(hashtag)
  //   console.log(des)

  if (req.body.image !== '' && req.body.imageUrl === false) {
    cloudinary.uploader.upload(req.body.image, function (_error, result) {
      console.log(result.url)
      con.query('INSERT INTO posts (p_detail,p_image,p_lang,p_hashtag,p_date,p_mid) VALUES (?,?,?,?,?,?)', [des, result.url, req.body.lang, hashtag, Date.now(), decoded.id], (_err, reqer) => {
        if (_err) { throw _err }
        res.send({ reqer, title: des, hashtag })
      })
    })
  } else {
    console.log(req.body.image)
    con.query('INSERT INTO posts (p_detail,p_image,p_lang,p_hashtag,p_date,p_mid) VALUES (?,?,?,?,?,?)', [des, req.body.image, req.body.lang, hashtag, Date.now(), decoded.id], (_err, reqer) => {
      if (_err) { throw _err }
      res.send({ reqer, title: des, hashtag })
    })
  }
})

app.get('/main/hashtag', (req, res) => {
  con.query('SELECT * FROM hashtag LIMIT 5', (_err, reqer) => {
    res.send(reqer)
  })
})

app.get('/main', (req, res) => {
  const perpage = 10
  let page
  if (req.query.page) {
    page = req.query.page
  } else {
    page = 1
  }
  const start = (page - 1) * perpage
  con.query('SELECT p_id FROM posts', function (err, resquerter) {
    if (err) {
      res.send('/404')
    } else {
      con.query('SELECT posts.p_id,posts.p_detail,posts.p_image,posts.p_lang,posts.p_hashtag,posts.p_date,m.m_id,m.m_name,m.m_image,COUNT(likes.l_id) as likes,GROUP_CONCAT(m2.m_id separator \',\') as liked,false as commentsShow, (SELECT COUNT(*) FROM comment WHERE c_pid = posts.p_id) as comments FROM posts ' +
      'LEFT JOIN likes on likes.l_pid = posts.p_id ' +
      'LEFT JOIN members m2 on likes.l_mid = m2.m_id ' +
      'INNER JOIN members m on posts.p_mid = m.m_id GROUP BY posts.p_id ' +
      'ORDER BY p_date DESC limit ? , ? ', [start, perpage], function (err, resquert) {
        if (err) {
          res.send(err)
        } else {
          const lastPage = Math.ceil(resquerter.length / perpage)
          res.tags = resquert
          res.lastPage = lastPage
          res.count = resquerter.length
          res.send({ resquert })
        }
      })
    }
  })
})

app.get('/like/:p_id', requireJWTAuth, (req, res) => {
  const usertoken = req.headers.authorization
  const decoded = jwt.decode(usertoken, SECRET)
  con.query('SELECT * FROM likes WHERE l_pid = ? AND l_mid = ?', [req.params.p_id, decoded.id], (_err1, reqer1) => {
    if (_err1) {
      console.log(_err1)
    }
    if (reqer1.length < 1) {
      con.query('INSERT INTO likes (l_pid,l_mid) VALUES (?,?)', [req.params.p_id, decoded.id], (_err, reqer) => {
        console.log(_err)
        res.send('success')
      })
    }
  })
})

app.delete('/unlike/:p_id', requireJWTAuth, (req, res) => {
  const usertoken = req.headers.authorization
  const decoded = jwt.decode(usertoken, SECRET)
  con.query('DELETE FROM likes WHERE l_pid = ? AND l_mid = ?', [req.params.p_id, decoded.id], (_err1, reqer1) => {
    if (_err1) {
      console.log(_err1)
    }
    res.send('success')
  })
})

app.get('/comment/:p_id', (req, res) => {
  con.query('SELECT c_id,c_mid,c_comment,c_image,m_id,m_name,m_image FROM comment LEFT JOIN members m on m.m_id = comment.c_mid WHERE c_pid = ? ORDER BY c_date DESC', [req.params.p_id], (_err, reqer) => {
    res.send(reqer)
  })
})

app.post('/addcomment', requireJWTAuth, (req, res) => {
  const usertoken = req.headers.authorization
  const decoded = jwt.decode(usertoken, SECRET)
  if (req.body.image !== '') {
    cloudinary.uploader.upload(req.body.image, function (_error, result) {
      console.log(result.url)
      con.query('INSERT INTO comment (c_pid,c_mid,c_comment,c_image,c_date) VALUES (?,?,?,?,?)', [req.body.c_pid, decoded.id, req.body.c_comment, result.url, Date.now()], (_err, reqer) => {
        console.log(_err)
        res.send(reqer)
      })
    })
  } else {
    con.query('INSERT INTO comment (c_pid,c_mid,c_comment,c_image,c_date) VALUES (?,?,?,?,?)', [req.body.c_pid, decoded.id, req.body.c_comment, req.body.image, Date.now()], (_err, reqer) => {
      console.log(_err)
      res.send(reqer)
    })
  }
})

module.exports = {
  path: '/api/',
  handler: app
}
