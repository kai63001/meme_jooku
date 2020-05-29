const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))
const jwt = require('jwt-simple')
const passport = require('passport')
const ExtractJwt = require('passport-jwt').ExtractJwt
const JwtStrategy = require('passport-jwt').Strategy
// secret key for jwt (ความลับสุดยอด)
const SECRET = 'shadow'
const cloudinary = require('cloudinary').v2
const con = require('../db/server')
// auth system a
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
// get user into the jwt key
app.get('/user', requireJWTAuth, (req, res) => {
  const usertoken = req.headers.authorization
  const decoded = jwt.decode(usertoken, SECRET)
  con.query('SELECT m_id,m_username,m_name,m_email,m_image,m_cover FROM members WHERE m_id = ?', [decoded.id], (_err, reqer) => {
    res.send({ user: reqer[0] })
  })
})
// logout :)
app.get('/logout', requireJWTAuth, (req, res) => {
  const usertoken = req.headers.authorization
  jwt.destroy(usertoken)
  res.send('logout')
})
const loginMiddleWare = (req, res, next) => {
  con.query('SELECT m_id,m_email FROM members WHERE m_email = ? AND m_password = ?', [req.body.username, req.body.password], (err, reqer) => {
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
    con.query('SELECT m_id,m_name,m_email FROM members WHERE m_email = ?;SELECT m_id FROM members WHERE m_username = ?', [req.body.registerEmail, req.body.registerUsername], (_error, reqerreg) => {
      if (_error) {
        res.send('_erroror')
      } else if (reqerreg[1].length > 0) {
        res.send('usernamesame')
      } else if (reqerreg[0].length === 0) {
        con.query('INSERT INTO members (m_name,m_username,m_email,m_password) VALUES (?,?,?,?)', [req.body.registerName, req.body.registerUsername, req.body.registerEmail, req.body.registerPassword], (_err, reqer) => {
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
// my cloud storage api key
cloudinary.config({
  cloud_name: 'dgoffpdxx',
  api_key: '282999112639611',
  api_secret: 'KhoVhcrnN9GbmHdgHpq_jEK4NPw'
})
// post in index
app.post('/post', requireJWTAuth, (req, res) => {
  const usertoken = req.headers.authorization
  const decoded = jwt.decode(usertoken, SECRET)
  console.log(req.body.title)
  let des = req.body.title
  // eslint-disable-next-line no-control-regex
  let hashtag = des.match(/(#(?:[^\x00-\x7F]|\w)+)/g)
  console.log(hashtag)
  if (hashtag !== null && hashtag.length > 0) {
    // eslint-disable-next-line no-control-regex
    des = des.replace(/(#(?:[^\x00-\x7F]|\w)+)/g, '').trim()
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
  if (req.body.tags.length > 0) {
    console.log(req.body.tags)
    const tags = req.body.tags.split(',')
    tags.forEach((h) => {
      con.query('SELECT * FROM tags WHERE t_name = ?', [h], (_err, reqer1) => {
        if (_err) {
          console.log(_err)
        }
        if (reqer1.length === 0) {
          con.query('INSERT INTO tags (t_name) VALUES (?)', [h], (_err, reqer2) => {
            if (_err) {
              console.log(_err)
            }
            console.log('insert tags')
          })
        } else {
          con.query('UPDATE tags SET t_count = ? WHERE t_id = ?', [reqer1[0].t_count + 1, reqer1[0].t_id], (_err, reqer3) => {
            if (_err) {
              console.log(_err)
            }
            console.log('UPDATE tags')
          })
        }
      })
    })
  }
  //   console.log(hashtag)
  //   console.log(des)

  if (req.body.image !== '' && req.body.imageUrl === false) {
    cloudinary.uploader.upload(req.body.image, function (_error, result) {
      con.query('INSERT INTO posts (p_detail,p_image,p_lang,p_hashtag,p_date,p_mid,p_tags) VALUES (?,?,?,?,?,?,?)', [des, result.url.replace(/http:\/\//g, 'https://'), req.body.lang, hashtag, Date.now(), decoded.id, req.body.tags], (_err, reqer) => {
        if (_err) { throw _err }
        res.send({ reqer, title: des, hashtag })
      })
    })
  } else {
    con.query('INSERT INTO posts (p_detail,p_image,p_lang,p_hashtag,p_date,p_mid,p_tags) VALUES (?,?,?,?,?,?,?)', [des, req.body.image, req.body.lang, hashtag, Date.now(), decoded.id, req.body.tags], (_err, reqer) => {
      if (_err) { throw _err }
      res.send({ reqer, title: des, hashtag })
    })
  }
})
// index hashtag
app.get('/main/hashtag', (req, res) => {
  con.query('SELECT * FROM hashtag ORDER BY h_count DESC LIMIT 5', (_err, reqer) => {
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
    } else if (req.query.userid) {
      con.query('SELECT posts.p_id,posts.p_detail,posts.p_image,posts.p_lang,posts.p_hashtag,posts.p_date,posts.p_tags,m.m_id,m.m_name,m.m_image,m.m_username,COUNT(likes.l_id) as likes,GROUP_CONCAT(m2.m_id separator \',\') as liked,false as commentsShow, (SELECT COUNT(*) FROM comment WHERE c_pid = posts.p_id) as comments FROM posts ' +
      'LEFT JOIN likes on likes.l_pid = posts.p_id ' +
      'LEFT JOIN members m2 on likes.l_mid = m2.m_id ' +
      'INNER JOIN members m on posts.p_mid = m.m_id ' +
      'WHERE p_mid = ? GROUP BY posts.p_id ' +
      'ORDER BY p_date DESC limit ? , ? ', [req.query.userid, start, perpage], function (err, resquert) {
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
    } else {
      con.query('SELECT posts.p_id,posts.p_detail,posts.p_image,posts.p_lang,posts.p_hashtag,posts.p_date,posts.p_tags,m.m_id,m.m_name,m.m_image,m.m_username,COUNT(likes.l_id) as likes,GROUP_CONCAT(m2.m_id separator \',\') as liked,false as commentsShow, (SELECT COUNT(*) FROM comment WHERE c_pid = posts.p_id) as comments FROM posts ' +
        'LEFT JOIN likes on likes.l_pid = posts.p_id ' +
        'LEFT JOIN members m2 on likes.l_mid = m2.m_id ' +
        'INNER JOIN members m on posts.p_mid = m.m_id ' +
        'GROUP BY posts.p_id ' +
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
// like system
app.get('/like/:p_id', requireJWTAuth, (req, res) => {
  const usertoken = req.headers.authorization
  const decoded = jwt.decode(usertoken, SECRET)
  // ตรวจสอบว่า like comment หรือ like post
  if (req.query.s === 'comment') {
    con.query('SELECT * FROM like_comment WHERE lc_cid = ? AND lc_mid = ?', [req.params.p_id, decoded.id], (_err1, reqer1) => {
      if (_err1) {
        console.log(_err1)
      } else if (reqer1.length < 1) {
        con.query('INSERT INTO like_comment (lc_pid,lc_cid,lc_mid) VALUES (?,?,?)', [req.query.pid, req.params.p_id, decoded.id], (_err, reqer) => {
          console.log(_err)
          res.send('success')
        })
      }
    })
  } else {
    con.query('SELECT * FROM likes WHERE l_pid = ? AND l_mid = ?', [req.params.p_id, decoded.id], (_err1, reqer1) => {
      if (_err1) {
        console.log(_err1)
      } else if (reqer1.length < 1) {
        con.query('INSERT INTO likes (l_pid,l_mid) VALUES (?,?)', [req.params.p_id, decoded.id], (_err, reqer) => {
          console.log(_err)
          res.send('success')
        })
      }
    })
  }
})
// unlike system
app.delete('/unlike/:p_id', requireJWTAuth, (req, res) => {
  const usertoken = req.headers.authorization
  const decoded = jwt.decode(usertoken, SECRET)
  // ตรวจสอบว่า like comment หรือ like post
  if (req.query.s === 'comment') {
    con.query('DELETE FROM like_comment WHERE lc_cid = ? AND lc_mid = ?', [req.params.p_id, decoded.id], (_err1, reqer1) => {
      if (_err1) {
        console.log(_err1)
      }
      res.send('success')
    })
  } else {
    con.query('DELETE FROM likes WHERE l_pid = ? AND l_mid = ?', [req.params.p_id, decoded.id], (_err1, reqer1) => {
      if (_err1) {
        console.log(_err1)
      }
      res.send('success')
    })
  }
})
// show comment system
app.get('/comment/:p_id', (req, res) => {
  const perpage = 4
  let page
  if (req.query.page) {
    page = req.query.page
  } else {
    page = 1
  }
  const start = (page - 1) * perpage
  con.query('SELECT c_id FROM comment WHERE c_pid = ?', [req.params.p_id], function (err, resquerter) {
    if (err) {
      res.send('/404')
    } else {
      con.query('SELECT c_id,c_mid,c_comment,c_image,m_id,m_name,m_username,m_image,c_date,COUNT(lc.lc_id) as likes ,GROUP_CONCAT(lc.lc_mid separator \',\') as liked,false as replay,(SELECT COUNT(*) FROM replay WHERE r_cid = comment.c_id) as replaycount FROM comment LEFT JOIN members m on m.m_id = comment.c_mid LEFT JOIN like_comment lc on lc.lc_cid = comment.c_id WHERE c_pid = ? GROUP BY comment.c_id ORDER BY c_date DESC limit ? , ?', [req.params.p_id, start, perpage], (_err, reqer) => {
        if (_err) {
          res.send(_err)
        } else {
          const lastPage = Math.ceil(resquerter.length / perpage)
          res.send({ lastPage, reqer })
        }
      })
    }
  })
})
// add comment system
app.post('/addcomment', requireJWTAuth, (req, res) => {
  const usertoken = req.headers.authorization
  const decoded = jwt.decode(usertoken, SECRET)
  // ถ้ามีรูป
  if (req.body.image !== '') {
    cloudinary.uploader.upload(req.body.image, function (_error, result) {
      console.log(result.url)
      con.query('INSERT INTO comment (c_pid,c_mid,c_comment,c_image,c_date) VALUES (?,?,?,?,?)', [req.body.c_pid, decoded.id, req.body.c_comment, result.url, Date.now()], (_err, reqer) => {
        console.log(_err)
        res.send(reqer)
      })
    })
  } else {
    // ถ้าไม่มีรูป
    con.query('INSERT INTO comment (c_pid,c_mid,c_comment,c_image,c_date) VALUES (?,?,?,?,?)', [req.body.c_pid, decoded.id, req.body.c_comment, req.body.image, Date.now()], (_err, reqer) => {
      console.log(_err)
      res.send(reqer)
    })
  }
})
// deletepost system
app.delete('/delete/post/:p_id', requireJWTAuth, (req, res) => {
  const usertoken = req.headers.authorization
  const decoded = jwt.decode(usertoken, SECRET)
  con.query('DELETE FROM posts WHERE p_id = ? AND p_mid = ?', [req.params.p_id, decoded.id], (_err, reqer) => {
    if (_err) {
      console.log(_err)
      res.send(_err)
    } else {
      con.query('DELETE FROM comment WHERE c_pid = ?;DELETE FROM likes WHERE l_pid = ?;DELETE FROM like_comment WHERE lc_pid = ?;', [req.params.p_id, req.params.p_id, req.params.p_id], (_err, reqer2) => {
        console.log(_err)
      })
      res.send(reqer)
    }
  })
})

app.get('/replay/:c_id', (req, res) => {
  con.query('SELECT r_id,r_mid,r_cid,r_pid,r_image,r_comment,m_username,m_image,m_name,r_date FROM replay LEFT JOIN members m on m.m_id = replay.r_mid WHERE r_cid = ? ORDER BY r_date DESC', [req.params.c_id], (_err, reqer) => {
    if (_err) {
      console.log(_err)
      res.send(_err)
    } else {
      res.send(reqer)
    }
  })
})

app.post('/comment/replay', requireJWTAuth, (req, res) => {
  const usertoken = req.headers.authorization
  const decoded = jwt.decode(usertoken, SECRET)
  // ถ้ามีรูป
  if (req.body.image !== '') {
    cloudinary.uploader.upload(req.body.image, function (_error, result) {
      console.log(result.url)
      con.query('INSERT INTO replay (r_pid,r_mid,r_comment,r_image,r_date,r_cid) VALUES (?,?,?,?,?,?)', [req.body.c_pid, decoded.id, req.body.c_comment, result.url, Date.now(), req.body.c_id], (_err, reqer) => {
        console.log(_err)
        res.send(reqer)
      })
    })
  } else {
    // ถ้าไม่มีรูป
    con.query('INSERT INTO replay (r_pid,r_mid,r_comment,r_image,r_date,r_cid) VALUES (?,?,?,?,?,?)', [req.body.c_pid, decoded.id, req.body.c_comment, req.body.image, Date.now(), req.body.c_id], (_err, reqer) => {
      console.log(_err)
      res.send(reqer)
    })
  }
})

app.get('/profile/:m_username', (req, res) => {
  con.query('SELECT * FROM members WHERE m_username = ? LIMIT 1', [req.params.m_username], (_err, reqer) => {
    if (_err) {
      console.log(_err)
      res.send(_err)
    } else {
      res.send(reqer)
    }
  })
})

module.exports = {
  path: '/api/',
  handler: app
}
