---
path: '/posts/cra-proxy'
title: 'create-react-app 2 에서 proxy 설정하기'
date: '2018-10-01'
tags: ['cra', 'create-react-app', 'proxy', 'react']
---

create-react-app(cra)이 업데이트가 되었는데 메이저 버전이 바뀌었군요.

첫 화면도 바뀌어서 뭔가 업데이트한 티가 팍팍 나는 군요.. ㅎㅎㅎ

# CHANGE LOG

https://github.com/facebook/create-react-app/blob/master/CHANGELOG.md

이번에 소개할 글은 업데이트 중 proxy 설정하는 법이 바뀌었던데 뭔가 저도 full-stack으로 개발할시 원래는 package.json에서 "proxy" 항목을 넣어줘서 처리를 했지만 이번에는 setupProxy.js 라는 이름의 파일을 만들어서 설정할수 있게 되었습니다.

# 튜토리얼

일단 http-proxy-middleware 를 설치하고, 테스트 통신을 하기 위해서 axios도 설치해 줍니다.

```bash
$ yarn add http-proxy-middleware axios
```

src폴더 아래에 setupProxy.js 를 다음과 같이 만들어 줍니다.

`src/setupProxy.js`

```js
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api', { target: 'http://localhost:4000/' }));
};
```

위와같이 backend 서버가 4000 포트를 쓴다면, http://localhost:4000/ 이 될것입니다.

저는 제 블로그 백엔드 서버를 사용하여서 위와같이 하였습니다.

그런다음, App.js를 다음과 같이 만들어줍니다.

`src/App.js`

```jsx
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  componentDidMount() {
    this.testing();
  }

  testing = async () => {
    try {
      const response = await axios.get('/api/post');
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
```

크롬 콘솔창을 보면 다음과 같이 proxy 통신이 됨을 알 수 있습니다.

React에서 setupProxy.js 를 사용하여 proxy를 설정하는 법을 알아 보았습니다.
