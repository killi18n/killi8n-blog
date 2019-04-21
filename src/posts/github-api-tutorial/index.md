---
path: '/posts/github-api-tutorial'
date: '2019-02-21'
title: 'Github API (OAuth) 사용법'
tags: ['tutorial', 'github api']
---

# Github API 사용법

1. 깃헙 세팅의 application 탭에서 OAuth application을 하나 만든다.

```html
<html>
  <head> </head>
  <body>
    <a
      href="#"
      onClick="MyWindow=window.open('https://github.com/login/oauth/authorize?scope=user:email&client_id=github_application_client_id','MyWindow',width=600,height=300); return false;"
    >
      Github Authentication
    </a>
  </body>
</html>
```

2. 위와같이 client id 를 사용하여 링크를 만든다. 팝업 링크가 뜨게된다.
3. Authorize가 완료되면, callback url로 넘어간다. 이 callback url 뒤에 붙는 `code=전달받은 코드값` 와 같은 코드값을 사용하여
4. Method: POST
5. Header: Content-Type: application/json
6. Body:

```js
{
  "code": "callback으로 받은 code",
  "client_id": "github application id",
  "client_secret": "github application secret",
}
```

7. URL: https://github.com/login/oauth/access_token

구조로 통신을 할시, response로 access_token값과 token_type, scope를 전달받게 된다.

7. access_token을 사용하여 header에 Authorization: 'bearer token값' 을 담아서 github의 api주소로 통신할수 있다.
