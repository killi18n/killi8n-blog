---
path: '/posts/react-todo-tutorial'
date: '2019-02-13'
title: 'React Todo 튜토리얼'
tags: ['react', 'todo', 'tutorial']
---

# 안내사항

프로젝트 깃헙 주소: https://github.com/slave4dead/todo-react

챕터별로 브랜치를 나누어 올려놓았으니, 참고하시면 됩니다.

# 프로젝트 샘플 링크

http://elfin-structure.surge.sh/

# 챕터

1. [프로젝트 준비](https://gist.github.com/slave4dead/57ef0bda5c4570cc0c313233ae3088ae/#1-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%A4%80%EB%B9%84)
2. [sass 설정](https://gist.github.com/slave4dead/57ef0bda5c4570cc0c313233ae3088ae/#2-sass-%EC%84%A4%EC%A0%95)
3. [프로젝트 구조 설정](https://gist.github.com/slave4dead/57ef0bda5c4570cc0c313233ae3088ae/#3-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B5%AC%EC%A1%B0-%EC%84%A4%EC%A0%95)
4. [컴포넌트 작성](https://gist.github.com/slave4dead/57ef0bda5c4570cc0c313233ae3088ae/#4-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%9E%91%EC%84%B1)
5. [Container에서 Todo 상태 관리하기](https://gist.github.com/slave4dead/57ef0bda5c4570cc0c313233ae3088ae/#5-container-%EC%97%90%EC%84%9C-todo-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0)
6. [반응형 스타일 손보기](https://gist.github.com/slave4dead/57ef0bda5c4570cc0c313233ae3088ae/#6-%EB%B0%98%EC%9D%91%ED%98%95-%EC%8A%A4%ED%83%80%EC%9D%BC-%EC%86%90%EB%B3%B4%EA%B8%B0)
7. [LocalStorage 로 새로고침하여도 데이터 유지하기](https://gist.github.com/slave4dead/57ef0bda5c4570cc0c313233ae3088ae/#7-localstorage-%EB%A1%9C-%EC%83%88%EB%A1%9C%EA%B3%A0%EC%B9%A8%ED%95%98%EC%97%AC%EB%8F%84-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%9C%A0%EC%A7%80%ED%95%98%EA%B8%B0)

# Todo 만들기

## 1. 프로젝트 준비

먼저 최신의 creact-react-app 을 실행하기 위해서, npx를 사용하여 creact-react-app을 실행하는 것을 추천합니다.
만약 npx가 global하게 설치되 있지 않다면,

```bash
yarn global add npx
```

혹은

```bash
npm install -g npx
```

명령어를 실행하여 npx를 글로벌하게 설치해줍니다.

그후,

```bash
npx create-react-app todo-react
```

를 실행하여 리액트 투두 프로젝트를 생성하여 줍니다.

```bash
cd ./todo-react
```

를 하여 프로젝트 루트로 들어갑니다.

저는 리액트 개발을 할때에 가장 편리한 에디터를 Visual Studio Code라고 생각합니다. 주관적인 저의 생각이므로, 다른 에디터를 사용하시거나 vim을 쓰시는 분들은 그대로 개발을 진행하셔도 무방합니다 :)

에디터로 todo-react 프로젝트를 띄워 줍니다.

일단 src폴더에서 필요하지 않은 파일들을 지워주겠습니다.
지울 파일들은 다음과 같습니다.

1. App.css
2. App.test.js
3. index.css
4. logo.svg

그리고 이 상태로 `yarn start` 를 하게되면 오류를 내놓을 것이므로, `index.js` 를 살짝 손봐주어야 합니다.

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
```

위와같이 index.css를 import하는 부분을 지워줍니다.

그리고 `App.js`도 손봐주어야 하겠죠?

`src/App.js`

```jsx
import React, { Component } from 'react';

class App extends Component {
  render() {
    return <div>App.js</div>;
  }
}

export default App;
```

위와같이 App.js도 불필요한 파일을 import하는 문장을 지워주고, 간단하게 render를 해줍니다.

자 이제 실행을 합니다.

```bash
yarn start
```

![Imgur](https://i.imgur.com/5xhr8KS.png)

위와같이 덩그러니 App.js 가 새겨진 브라우저를 보실수 있습니다.
여기까지 진행된 작업은 [링크](https://gist.github.com/slave4dead/57ef0bda5c4570cc0c313233ae3088ae) 에서 확인하실수 있습니다.

## 2. sass 설정.

우리는 앞으로 style을 css가 아닌 sass를 사용하여 작성할 것이므로, sass 를 사용하기 위해 다음 작업들을 해야합니다.

```bash
yarn eject
yarn add node-sass
```

추후 설정의 편리상 eject를 시키고, node-sass를 추가하여 줍니다.

만약 eject시 오류가 난다면,

```bash
git add .
git commit -m "eject"
```

를 실행후, 다시 `yarn eject`를 하여주시면 오류없이 진행될것입니다.

이제 리액트 앱의 전체 스타일을 reset하기 위해서 다음 모듈을 설치합니다.

```bash
yarn add css-reset-and-normalize
```

위 모듈을 설치하는 이유는, 브라우저의 전체 스타일 자체를 모두 초기화 시키기 위해서입니다. 기본적으로 브라우저에는 불필요한 스타일들이 포함 되있으므로, 그것을 reset 하여 백지상태로 만들려고 합니다.

문제없이 install 하였으면, `src` 폴더 아래에 `styles` 폴더를 생성하고, 그 안에 `index.scss` 파일을 생성합니다.

`src/styles/index.scss`

```scss
@import '~css-reset-and-normalize/scss/reset-and-normalize';
```

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.scss'; // 바뀐부분
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
```

그상태로 리로드 된 화면을 보면 오류를 내뿜을 것입니다. 이제 터미널에서 ctrl + c 를 하여 리액트 앱을 종료시킨후, 다시 `yarn start` 로 실행하면 App.js 란 글자가 브라우저에 딱 붙어있는것을 볼수 있습니다.

#### reset 이전

![Imgur](https://i.imgur.com/5xhr8KS.png)

#### reset 이후

![Imgur](https://i.imgur.com/46PXkVx.png)

차이가 느껴지나요?

이제, 모든 컴포넌트들에 공통적으로 쓰일 스타일 모듈들을 설치하고 `common.scss` 파일을 작성 해봅시다.

```bash
yarn add open-color include-media
```

를 실행하여 두 모듈을 설치하여 주세요.

[open-color](https://yeun.github.io/open-color/) 는 링크에서 볼수있듯이, 실사용하기 좋은 색상들을 제공해주는 라이브러리 입니다. 굳이 hex 값의 색상을 설정하지 않아도, open-color에서 제공해주는 변수들을 사용하여 편하게 색상을 불러올수 있습니다.

[include-media](https://include-media.com/) 라이브러리는 css 의 media 를 조금더 custom화 하여, 직관적으로 사용하기 쉽게 만든 라이브러리 입니다.

설치가 되었다면,

`src/styles/common.scss`

```scss
@import '~open-color/open-color';
@import '~include-media/dist/include-media';
```

위와같이 작성하여주세요.
앞으로 `common.scss`를 모든 컴포넌트의 스타일 파일로 불러와서 사용할 것이므로 공통 스타일 라이브러리를 불러온것입니다.

앞에서 말한 include-media를 이용하여 화면의 크기의 기준을 정하기 위해서

`styles/variables.scss`

```scss
$breakpoints: (
  small: 320px,
  medium: 768px,
  large: 1024px,
  wide: 1400px,
);
```

위와같이 작성하여 준 후,

`styles/common.scss`

```scss
@import '~open-color/open-color';
@import '~include-media/dist/include-media';
@import './variables.scss';
```

불러와 줍니다.

여기까지의 프로젝트는 브랜치(2.setup-sass) [링크](https://github.com/slave4dead/todo-react/tree/2.setup-sass) 에서 보실수 있습니다.

## 3. 프로젝트 구조 설정.

자 이제 프로젝트를 생성하고, eject 하고, 스타일 설정까지 완료 하였으니 프로젝트 구조를 설정해 보겠습니다.

먼저 컴포넌트들이 위치할 `components` 폴더를 src 아래에 생성합니다.
그리고 `App.js`를 `components` 폴더에 위치시킵니다.

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'; // 바뀐 부분
import './styles/index.scss';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
```

위와같이 경로를 재설정하여 import 해줍니다.

만약 앞으로도 저렇게 상대경로를 사용한다면, import 하는것이 조금 귀찮을수 있습니다. 프로젝트가 커지게 되면 상대경로로 모든것을 불러오는것이 조금은 부담스럽겠죠?

이런 문제를 해결하기 위해서 다음 파일을 작성해줍니다.
src 아래에 작성하는것이 아닌 전체 프로젝트 아래에 작성해줍니다.

`.env`

```
NODE_PATH=src
```

그리고 `index.js` 파일에서 `App.js`를 src를 기반으로 한 절대경로로 불러옵니다.

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App'; // 바뀐부분
import './styles/index.scss';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
```

또한

`src/App.js`

다시 `yarn start`를 하면 문제없이 불러오는것을 볼수있습니다.

그 다음으로, 로직들을 처리하기 위한 `containers`폴더를 생성해 줄것입니다.

`components`폴더가 보여주는 (presenter) 역할을 하는 컴포넌트들이 들어갔다면, `containers`폴더에는 단지 presenter 들을 불러오기만 할뿐 보여지는 측면에서는 의미가 없습니다. 다만, props로 presenter 들에게 전달을 하고, 각종 로직들을 수행하는 컴포넌트들이 위치하게 됩니다.

`src/containers` 를 생성해 줍니다.

`src/containers/TodoContainer.js`

```jsx
import React, { Component } from 'react';
import App from 'components/App';

class TodoContainer extends Component {
  render() {
    return <App />;
  }
}

export default TodoContainer;
```

위와같이 TodoContainer.js를 작성한후,

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import TodoContainer from 'containers/TodoContainer'; // 바뀐부분
import './styles/index.scss';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<TodoContainer />, document.getElementById('root'));
serviceWorker.unregister();
```

다음과같이 index.js 에서 TodoContainer를 불러옵니다.

이때까지의 작업은 모두 [링크](https://github.com/slave4dead/todo-react/tree/3.setup-project-structure) 에서 보실수 있습니다.

## 4. 컴포넌트 작성.

이제부터, 보여지는 컴포넌트들을 작성해보도록 하겠습니다.

`components/TodoList.js`

```jsx
import React from 'react';
import './TodoList.scss';

const TodoList = () => {
  return <div className="TodoListWrapper">TodoList</div>;
};

export default TodoList;
```

`components/TodoList.scss`

```scss
@import '~styles/common.scss';

.TodoListWrapper {
}
```

`containers/TodoContainer.js`

```jsx
import React, { Component } from 'react';
import TodoList from 'components/TodoList';

class TodoContainer extends Component {
  render() {
    return <TodoList />;
  }
}

export default TodoContainer;
```

일단 이렇게 하면, 컨테이너에서 TodoList를 보여주겠죠?
앞으로 App.js는 필요하지 않으니, 지워도 무방합니다.

이제 타이틀 컴포넌트를 만들어서 TodoList 컴포넌트에 보여주어 보겠습니다.

`components/TodoTitle.js`

```jsx
import React from 'react';
import './TodoTitle.scss';

const TodoTitle = () => {
  return <div className="TitleWrapper">리액트 투두 리스트</div>;
};

export default TodoTitle;
```

`components/TodoTitle.scss`

```scss
@import '~styles/common.scss';

.TitleWrapper {
  margin: 0 auto;
  font-size: 2rem;
  font-weight: 600;

  background: $oc-gray-6;
  color: white;

  width: 100%;
  height: 4rem;

  display: flex;
  justify-content: center;
  align-items: center;
}
```

`components/TodoList.js`

```jsx
import React from 'react';
import './TodoList.scss';
import TodoTitle from './TodoTitle';

const TodoList = () => {
  return (
    <div className="TodoListWrapper">
      <TodoTitle />
    </div>
  );
};

export default TodoList;
```

`components/TodoList.scss`

```scss
@import '~styles/common.scss';

.TodoListWrapper {
  display: flex;
  flex-direction: column;

  margin: 0 auto;

  width: 600px;
  height: 600px;

  background: $oc-gray-0;
  border: 1px solid $oc-gray-7;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

![Imgur](https://i.imgur.com/RFP9FOw.png)

이런 모양의 투두리스트가 나타났나요?

그렇다면, 이제 투두를 작성할 input 폼을 만들어 보겠습니다.

`components/TodoInput.js`

```jsx
import React from 'react';
import './TodoInput.scss';

const TodoInput = () => {
  return (
    <div className="TodoInputWrapper">
      <input type="text" name="todo" placeholder="작성할 투두를 입력하세요." />
      <div className="AddButton">추가하기</div>
    </div>
  );
};

export default TodoInput;
```

`components/TodoInput.scss`

```scss
@import '~styles/common.scss';

.TodoInputWrapper {
  display: flex;

  input {
    width: 100%;
    height: 2.5rem;
    font-size: 1.25rem;
    padding: 0.5rem;

    outline: none;
    border: 1px solid $oc-gray-3;
    flex: 1;
  }

  .AddButton {
    width: 100px;
    background: $oc-cyan-5;
    display: flex;
    align-items: center;
    justify-content: center;

    color: white;
    font-weight: 600;

    user-select: none;
    cursor: pointer;

    &:hover {
      background: $oc-cyan-4;
    }

    &:active {
      background: $oc-cyan-6;
    }
  }
}
```

이제 input form을 TodoList Component에 불러옵니다.

`components/TodoList.js`

```jsx
import React from 'react';
import './TodoList.scss';
import TodoTitle from './TodoTitle';
import TodoInput from './TodoInput';

const TodoList = () => {
  return (
    <div className="TodoListWrapper">
      <TodoTitle />
      <TodoInput />
    </div>
  );
};

export default TodoList;
```

![Imgur](https://i.imgur.com/QKQ5zCd.png)

이렇게 투두를 작성할 input form이 완성됨을 볼수있습니다.

이제 마지막 컴포넌트인 TodoItem을 작성해보도록 하겠습니다.

`components/TodoItem.js`

```jsx
import React from 'react';
import './TodoItem.scss';

const TodoItem = () => {
  return <div className="TodoItemWrapper">무엇 무엇을 하자</div>;
};

export default TodoItem;
```

`components/TodoItem.scss`

```scss
@import '~styles/common.scss';

.TodoItemWrapper {
  background: $oc-gray-1;
  height: 3rem;

  display: flex;
  justify-content: left;
  align-items: center;

  padding-left: 1rem;
  padding-right: 1rem;

  font-size: 1.25rem;
  font-weight: 550;

  & + & {
    border-top: 1px solid $oc-gray-4;
  }
}
```

그리고 TodoList 에 반영하기 전에, 잠시 TodoList.scss를 손봐주겠습니다.

`components/TodoList.scss`

```scss
@import '~styles/common.scss';

.TodoListWrapper {
  display: flex;
  flex-direction: column;

  margin: 0 auto;

  width: 600px;
  height: 600px;

  background: $oc-gray-0;
  border: 1px solid $oc-gray-7;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  // 추가된 부분
  .TodoItemListWrapper {
    overflow-y: scroll;
    flex: 1;
  }
}
```

`src/TodoList.js`

```jsx
import React from 'react';
import './TodoList.scss';
import TodoTitle from './TodoTitle';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

const TodoList = () => {
  return (
    <div className="TodoListWrapper">
      <TodoTitle />
      <TodoInput />
      <div className="TodoItemListWrapper">
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
      </div>
    </div>
  );
};

export default TodoList;
```

![Imgur](https://i.imgur.com/KYzjjFu.png)

위와같이 스크롤이 되면서 투두아이템들이 나타남을 볼수있죠?

아직 끝난것이 아닙니다. 삭제 마크와 수정 마크를 달아보도록 하겠습니다.
리액트에서 아이콘을 제공해주는 라이브러리인 react-icons를 설치해주겠습니다.

```bash
yarn add react-icons
```

`components/TodoItem.js`

```jsx
import React from 'react';
import { FaEdit, FaEraser } from 'react-icons/fa';
import './TodoItem.scss';

const TodoItem = () => {
  return (
    <div className="TodoItemWrapper">
      무엇 무엇을 하자
      <div className="Icons">
        <div className="Icon">
          <FaEdit />
        </div>
        <div className="Icon">
          <FaEraser />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
```

위와같이 icon들을 불러와줍니다.

`components/TodoItem.scss`

```scss
@import '~styles/common.scss';

.TodoItemWrapper {
  ...
    
    // 추가된 부분

    .Icons {
    display: flex;
    align-items: center;
    margin-left: auto;

    .Icon {
      flex: 1;
      cursor: pointer;

      &:hover {
        transform: scale(1.25);
      }

      &:active {
        transform: scale(1);
      }
    }

    .Icon + .Icon {
      margin-left: 1rem;
    }
  }
}
```

![Imgur](https://i.imgur.com/6C1jpdn.png)

위와같이 추가된 아이콘들을 볼수있습니다.
이제 컴포넌트들을 만드는 작업은 끝났습니다.
[4.make-components 브랜치](https://github.com/slave4dead/todo-react/tree/4.make-components) 에서 지금까지의 작업을 확인할수 있습니다.

## 5. Container 에서 Todo 상태 관리하기.

자 이제는 TodoContainer에서 코딩을 할 차례입니다.
위에서는 단순히 하드코딩방식으로 TodoItem들을 보여주었죠? 앞으로 저 하드코딩된 TodoItem들을 리액트 state로 관리하여 동적으로 관리하여 볼것입니다.

`containers/TodoContainer.js`

```jsx
import React, { Component } from 'react';
import TodoList from 'components/TodoList';

class TodoContainer extends Component {
  state = {
    todos: [
      {
        id: 0,
        title: '리액트 공부',
      },
      {
        id: 1,
        title: '좋은 공연있나 찾아보기',
      },
      {
        id: 2,
        title: '줄넘기 하기',
      },
      {
        id: 3,
        title: '기타 연주 하기',
      },
    ],
  };

  render() {
    const { todos } = this.state;
    return <TodoList todos={todos} />;
  }
}

export default TodoContainer;
```

state로 todos를 작성한뒤, TodoList에 Props로 전달하여줍니다.

`components/TodoList.js`

```jsx
import React from 'react';
import './TodoList.scss';
import TodoTitle from './TodoTitle';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

const TodoList = ({ todos }) => {
  const todoItemsList = todos.map(todo => (
    <TodoItem key={todo.id} todo={todo} />
  ));

  return (
    <div className="TodoListWrapper">
      <TodoTitle />
      <TodoInput />
      <div className="TodoItemListWrapper">{todoItemsList}</div>
    </div>
  );
};

export default TodoList;
```

그리고 컨테이너로 부터 받아온 todos를 map 함수를 사용하여 리스트화 하여 줍니다. 그리고 렌더링 하여줍니다.

`components/TodoItem.js`

```jsx
import React from 'react';
import { FaEdit, FaEraser } from 'react-icons/fa';
import './TodoItem.scss';

const TodoItem = ({ todo }) => {
  return (
    <div className="TodoItemWrapper">
      {todo.title}
      <div className="Icons">
        <div className="Icon">
          <FaEdit />
        </div>
        <div className="Icon">
          <FaEraser />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
```

TodoItem으로 넘겨준 todo Prop을 받아와서 title을 렌더링 하여줍니다.

![Imgur](https://i.imgur.com/sk8qZER.png)

이런식으로 state에 작성한 todos 만 나타난다면 성공입니다.

이제 추가하는 로직을 작성하여 기존 state의 todos에 추가해보겠습니다.

먼저 TodoInput에서 value값을 관리하는 함수를 작성해보겠습니다.

`TodoContainer.js`

```jsx
import React, { Component } from 'react';
import TodoList from 'components/TodoList';

class TodoContainer extends Component {
  state = {
    todos: [
      {
        id: 0,
        title: '리액트 공부',
      },
      {
        id: 1,
        title: '좋은 공연있나 찾아보기',
      },
      {
        id: 2,
        title: '줄넘기 하기',
      },
      {
        id: 3,
        title: '기타 연주 하기',
      },
    ],
    todoInput: '', // todoInput state 추가
  };

  // todoInput의 value값이 change될때마다 실행될 함수.
  // this.setState 함수를 써서 state 값 중 나머지는 ...this.state로 건드리지 않고, 오직 todoInput값만 변경하여 주는 함수입니다.
  changeTodoInput = e => {
    const { value } = e.target;
    this.setState({
      ...this.state,
      todoInput: value,
    });
  };

  render() {
    const { todos, todoInput } = this.state;
    const { changeTodoInput } = this;
    return (
      <TodoList
        todos={todos}
        onChangeInput={changeTodoInput}
        todoInput={todoInput}
      />
    );
  }
}

export default TodoContainer;
```

위와같이 함수를 작성하고 Props로 값을 전달하여 줍니다.

`TodoList.js`

```jsx
import React from 'react';
import './TodoList.scss';
import TodoTitle from './TodoTitle';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onChangeInput, todoInput }) => {
  const todoItemsList = todos.map(todo => (
    <TodoItem key={todo.id} todo={todo} />
  ));

  return (
    <div className="TodoListWrapper">
      <TodoTitle />
      <TodoInput onChange={onChangeInput} todoInput={todoInput} />
      <div className="TodoItemListWrapper">{todoItemsList}</div>
    </div>
  );
};

export default TodoList;
```

TodoList에서 전달받은 Props를 다시 ToodInput 컴포넌트에 전달합니다.

`TodoInput.js`

```jsx
import React from 'react';
import './TodoInput.scss';

const TodoInput = ({ onChange, todoInput }) => {
  return (
    <div className="TodoInputWrapper">
      <input
        type="text"
        name="todo"
        placeholder="작성할 투두를 입력하세요."
        onChange={onChange}
        value={todoInput}
      />
      <div className="AddButton">추가하기</div>
    </div>
  );
};

export default TodoInput;
```

TodoInput에서 전달받은 함수와 밸류값을 반영합니다.

![Imgur](https://i.imgur.com/cNTjWsb.png)

[리액트 데브툴스](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) 확장 플러그인을 설치하여, input form부분을 눌러보면, 위 이미지와 같이 값이 변경될때마다, state 의 값도 같이 변경됨을 볼수있습니다.

이제 변경된 값을 바탕으로 state의 todos에 todo를 추가해야 겠습니다.

`TodoContainer.js`

```jsx
...

insertTodo = () => {
	const { todoInput, todos } = this.state;
	this.setState({
	    ...this.state,
	    todos: todos.concat({
		id: todos.length === 0 ? 0 : todos[todos.length - 1].id + 1,
		title: todoInput
	    }),
	    todoInput: ""
	});
}

render() {
	const { todos, todoInput } = this.state;
	const { changeTodoInput, insertTodo } = this;
	return (
	    <TodoList
		todos={todos}
		onChangeInput={changeTodoInput}
		todoInput={todoInput}
		insertTodo={insertTodo} />
	);
}

```

위와같이 insertTodo 함수를 작성하여 나머지 state들은 건드리지 않고, 변경할 state만 변경하여 줍니다. (사실 지금은 state값이 두개밖에 없으므로, ...this.state를 빼도 무방합니다.)

`TodoList.js`

```jsx
import React from 'react';
import './TodoList.scss';
import TodoTitle from './TodoTitle';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onChangeInput, todoInput, insertTodo }) => {
  const todoItemsList = todos.map(todo => (
    <TodoItem key={todo.id} todo={todo} />
  ));

  return (
    <div className="TodoListWrapper">
      <TodoTitle />
      <TodoInput
        onChange={onChangeInput}
        todoInput={todoInput}
        insertTodo={insertTodo}
      />
      <div className="TodoItemListWrapper">{todoItemsList}</div>
    </div>
  );
};

export default TodoList;
```

Props로 받은 값들을 TodoInput 컴포넌트에 전달하여 줍니다.

`TodoInput.js`

```jsx
import React from 'react';
import './TodoInput.scss';

const TodoInput = ({ onChange, todoInput, insertTodo }) => {
  return (
    <div className="TodoInputWrapper">
      <input
        type="text"
        name="todo"
        placeholder="작성할 투두를 입력하세요."
        onChange={onChange}
        value={todoInput}
      />
      <div className="AddButton" onClick={insertTodo}>
        추가하기
      </div>
    </div>
  );
};

export default TodoInput;
```

Props로 받아온 값을 AddButton 을 클릭하였을때에 적용해 줍니다.
이제 클릭하면, TodoInput의 값은 사라지고, 새로운 투두가 추가됩니다. 하지만 클릭했을때만 추가하면 좀 불편함이 있죠. 인풋에서 엔터를 쳤을때 추가해보겠습니다.

`TodoInput.js`

```jsx
import React from 'react';
import './TodoInput.scss';

const TodoInput = ({ onChange, todoInput, insertTodo }) => {
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      insertTodo();
    }
  };

  return (
    <div className="TodoInputWrapper">
      <input
        type="text"
        name="todo"
        placeholder="작성할 투두를 입력하세요."
        onChange={onChange}
        value={todoInput}
        onKeyPress={handleKeyPress}
      />
      <div className="AddButton" onClick={insertTodo}>
        추가하기
      </div>
    </div>
  );
};

export default TodoInput;
```

위와같이 onKeyPress 함수를 사용하여 Enter를 눌렀을때, 똑같이 추가되는 함수를 작성하여 적용하였습니다.
이제 삭제와 수정하는 함수들을 만들어 보겠습니다.

`TodoContainer.js`

```jsx
...
// 기존의 state에서 parameter로 받아온 id값에 일치하지 않는 todo들만 살리는 함수입니다.
// filter 함수는 true를 반환하면 원래상태를 유지하는 배열을 반환하고, false라면 값을 반환하지 않아 배열에 추가되지 않습니다.
// 참고: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
removeTodo = (id) => {
	const { todos } = this.state;
	this.setState({
	    ...this.state,
	    todos: todos.filter(todo => todo.id !== id)
	});
}

render() {
	const { todos, todoInput } = this.state;
	const { changeTodoInput, insertTodo, removeTodo } = this;
	return (
	    <TodoList
		todos={todos}
		onChangeInput={changeTodoInput}
		todoInput={todoInput}
		insertTodo={insertTodo}
		removeTodo={removeTodo} />
	);
}

    ...
```

TodoList에 값을 전달해주겠습니다.

`TodoList.js`

```jsx
import React from 'react';
import './TodoList.scss';
import TodoTitle from './TodoTitle';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

const TodoList = ({
  todos,
  onChangeInput,
  todoInput,
  insertTodo,
  removeTodo,
}) => {
  const todoItemsList = todos.map(todo => (
    <TodoItem key={todo.id} todo={todo} removeTodo={removeTodo} />
  ));

  return (
    <div className="TodoListWrapper">
      <TodoTitle />
      <TodoInput
        onChange={onChangeInput}
        todoInput={todoInput}
        insertTodo={insertTodo}
      />
      <div className="TodoItemListWrapper">{todoItemsList}</div>
    </div>
  );
};

export default TodoList;
```

TodoItem에 값을 전달합니다. 그리고 클릭했을때에 id를 파라미터로 전달해주는 함수를 작성합니다.

`TodoItem.js`

```jsx
import React from 'react';
import { FaEdit, FaEraser } from 'react-icons/fa';
import './TodoItem.scss';

const TodoItem = ({ todo, removeTodo }) => {
  const onRemove = () => {
    removeTodo(todo.id);
  };

  return (
    <div className="TodoItemWrapper">
      {todo.title}
      <div className="Icons">
        <div className="Icon">
          <FaEdit />
        </div>
        <div className="Icon" onClick={onRemove}>
          <FaEraser />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
```

지우개 버튼을 눌렀을때 삭제가 잘됨을 볼수있다면 성공입니다.

이제 마지막으로 수정하는 로직을 작성해봅시다.

다시 컨테이너로 돌아갑니다.

원래 있던 state todos에서 isEditing 값을 추가해줍니다.

`TodoContainer.js`

```jsx
...
    state = {
        todos: [
            {
                id: 0,
                title: '리액트 공부',
                isEditing: false
            },
            {
                id: 1,
                title: '좋은 공연있나 찾아보기',
                isEditing: false
            },
            {
                id: 2,
                title: '줄넘기 하기',
                isEditing: false
            },
            {
                id: 3,
                title: '기타 연주 하기',
                isEditing: false
            }
        ],
        todoInput: '' // todoInput state 추가
    };
 ...
```

그리고 Todo를 토글하는 함수를 작성합니다.

`TodoContainer.js`

```jsx
...
    onToggleEdit = (id) => {
        const { todos } = this.state;
        // 토글된 투두만을 골라내어 나머지값들은 유지하고, isEditing 값만 반대로 바꾸어줍니다.
        // 나머지 투두들은 모두 isEditing을 false로 바꾸어줍니다.
        const toggledTodos = todos.map(todo => {
            if(todo.id === id) {
                return {
                    ...todo,
                    isEditing: !todo.isEditing
                }
            };

            return {
                ...todo,
                isEditing: false
            };
        });

        this.setState({
            ...this.state,
            todos: toggledTodos
        });
    }
...


    render() {
        const { todos, todoInput } = this.state;
        const { changeTodoInput, insertTodo, removeTodo, onToggleEdit } = this;
        return (
            <TodoList
                todos={todos}
                onChangeInput={changeTodoInput}
                todoInput={todoInput}
                insertTodo={insertTodo}
                removeTodo={removeTodo}
                onToggleEdit={onToggleEdit} />
        );
    }
    ...
```

값을 Props로 전달했다면, TodoList에서도 TodoItem으로 똑같이 전달합니다.

`TodoList.js`

```jsx
import React from 'react';
import './TodoList.scss';
import TodoTitle from './TodoTitle';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

const TodoList = ({
  todos,
  onChangeInput,
  todoInput,
  insertTodo,
  removeTodo,
  onToggleEdit,
}) => {
  const todoItemsList = todos.map(todo => (
    <TodoItem
      key={todo.id}
      todo={todo}
      removeTodo={removeTodo}
      onToggleEdit={onToggleEdit}
    />
  ));

  return (
    <div className="TodoListWrapper">
      <TodoTitle />
      <TodoInput
        onChange={onChangeInput}
        todoInput={todoInput}
        insertTodo={insertTodo}
      />
      <div className="TodoItemListWrapper">{todoItemsList}</div>
    </div>
  );
};

export default TodoList;
```

`TodoItem.js`

```jsx
import React from 'react';
import { FaEdit, FaEraser } from 'react-icons/fa';
import './TodoItem.scss';

const TodoItem = ({ todo, removeTodo, onToggleEdit }) => {
  const onRemove = () => {
    removeTodo(todo.id);
  };

  const onToggle = () => {
    onToggleEdit(todo.id);
  };

  return (
    <div className="TodoItemWrapper">
      {todo.title}
      <div className="Icons">
        <div className="Icon" onClick={onToggle}>
          <FaEdit />
        </div>
        <div className="Icon" onClick={onRemove}>
          <FaEraser />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
```

![Imgur](https://i.imgur.com/vZvIVBr.png)

에딧 버튼을 토글 한뒤,
React Devtools로 state값을 확인해보면 state도 상태가 변경됨을 알수있습니다.

이제 시각적인 효과를 나타내어 다시 작성할수 있게 해야겠습니다.
또한 다시 작성된 투두를 반영시켜야 하겠죠.

`TodoContainer.js`

```jsx
...
    changeEditTodoInput = (value, id) => {
        const { todos } = this.state;
        // parameter로 받아온 id값을 기준으로 index를 찾아냅니다.
        const index = todos.findIndex(todo => id === todo.id);
        // 찾아낸 인덱스값으로 바꿀 투두를 변수로 저장합니다.
        const newTodo = todos[index];
        // 아에 바뀔 state의 todos를 변수로 저장합니다.
        const newTodos = [...todos];
        // 새로운 투두에서 바뀔 투두만 title값만 바꾸어줍니다.
        newTodos[index] = {
            ...newTodo,
            title: value
        };
        this.setState({
            ...this.state,
            todos: newTodos
        });
    }

    render() {
        const { todos, todoInput } = this.state;
        const { changeTodoInput, insertTodo, removeTodo, onToggleEdit, changeEditTodoInput } = this;
        return (
            <TodoList
                todos={todos}
                onChangeInput={changeTodoInput}
                todoInput={todoInput}
                insertTodo={insertTodo}
                removeTodo={removeTodo}
                onToggleEdit={onToggleEdit}
                changeEditTodoInput={changeEditTodoInput} />
        );
    }
    ....
```

`TodoItem.js`

```jsx
import React from 'react';
import { FaEdit, FaEraser } from 'react-icons/fa';
import './TodoItem.scss';

const TodoItem = ({ todo, removeTodo, onToggleEdit, changeEditTodoInput }) => {
  const onRemove = () => {
    removeTodo(todo.id);
  };

  const onToggle = () => {
    onToggleEdit(todo.id);
  };

  const onChange = e => {
    const { value } = e.target;
    changeEditTodoInput(value, todo.id);
  };

  return (
    <div className="TodoItemWrapper">
      {todo.isEditing ? (
        <input
          type="text"
          name="editTodoInput"
          value={todo.title}
          onChange={onChange}
        />
      ) : (
        todo.title
      )}
      <div className="Icons">
        <div className="Icon" onClick={onToggle}>
          <FaEdit />
        </div>
        <div className="Icon" onClick={onRemove}>
          <FaEraser />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
```

이제 투두를 바꾸고 다시 에딧버튼을 누르면 상태도 똑같이 바뀌어있기때문에, 바뀐상태로 유지가 됨을 알수 있습니다.
input의 outline이 표시되는게 예쁘지 않은것 같으므로,

`TodoItems.scss`

```scss
... input {
  outline: none;
}
```

추가해줍니다.

자 이제 투두관련 로직들을 관리하는 컨테이너 작성은 끝난것 같네요.
이 챕터에서 이때까지 한 작업은 [링크](https://github.com/slave4dead/todo-react/tree/5.container-logics) 에서 보실수 있습니다.

## 6. 반응형 스타일 손보기

마지막 챕터입니다. 초반에 받아놓은 include-media 라이브러리를 사용할 때입니다.

지금은 크롬브라우저를 사용하여 모바일로 볼때에, 투두 아이템 들이 삐져 나오는것을 알수있습니다. 이것을 최적화 시켜보겠습니다.

`TodoList.scss`

```scss
@import '~styles/common.scss';

.TodoListWrapper {
  display: flex;
  flex-direction: column;

  margin: 0 auto;

  width: 600px;
  height: 600px;

  background: $oc-gray-0;
  border: 1px solid $oc-gray-7;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .TodoItemListWrapper {
    overflow-y: scroll;
    flex: 1;
  }

  // 추가된 부분
  // breakpoints에서 지정한 medium값보다 화면넓이가 작아질시, width를 전체화면의 90%로 맞춤.
  @include media('<medium') {
    width: 90%;
  }
}
```

이제 모바일에서도 잘보이겠죠?

하나 더 추가하자면, 현재 투두를 너무 길게작성하면 투두 아이템이 깨지는것을볼수 있는데, 이부분 또한 고쳐보겠습니다.

`TodoItem.js`

```jsx
import React from 'react';
import { FaEdit, FaEraser } from 'react-icons/fa';
import './TodoItem.scss';

const TodoItem = ({ todo, removeTodo, onToggleEdit, changeEditTodoInput }) => {
  const onRemove = () => {
    removeTodo(todo.id);
  };

  const onToggle = () => {
    onToggleEdit(todo.id);
  };

  const onChange = e => {
    const { value } = e.target;
    changeEditTodoInput(value, todo.id);
  };

  return (
    <div className="TodoItemWrapper">
      {todo.isEditing ? (
        <input
          type="text"
          name="editTodoInput"
          value={todo.title}
          onChange={onChange}
        />
      ) : (
        <div className="TodoTitle">{todo.title}</div>
      ) // 이부분을 태그로 감싸줍니다.
      }
      <div className="Icons">
        <div className="Icon" onClick={onToggle}>
          <FaEdit />
        </div>
        <div className="Icon" onClick={onRemove}>
          <FaEraser />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
```

`TodoItem.scss`

```scss
@import '~styles/common.scss';

.TodoItemWrapper {
  background: $oc-gray-1;
  height: 3rem;

  display: flex;
  justify-content: left;
  align-items: center;

  padding-left: 1rem;
  padding-right: 1rem;

  font-size: 1.25rem;
  font-weight: 550;

  // ellipsis(생략 효과)를 주는 스타일을 작성합니다.
  .TodoTitle {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & + & {
    border-top: 1px solid $oc-gray-4;
  }

  .Icons {
    display: flex;
    align-items: center;
    margin-left: auto;

    .Icon {
      flex: 1;
      cursor: pointer;

      &:hover {
        transform: scale(1.25);
      }

      &:active {
        transform: scale(1);
      }
    }

    .Icon + .Icon {
      margin-left: 1rem;
    }
  }
}

input {
  outline: none;
}
```

![Imgur](https://i.imgur.com/XutOWNf.png)

이제 모바일에서도 최적화 되있음을 볼수있네요.

이 챕터의 작업은 [링크](https://github.com/slave4dead/todo-react/tree/6.flexible-styles) 에서 볼수있습니다.

## 7. LocalStorage 로 새로고침하여도 데이터 유지하기.

아직까지는 새로고침할시 초기 state의 todo 값이 다시 되돌아 오기 때문에, 추가를 하거나 수정하여도, 저장이 되지 않는것을 볼수있습니다.
이것은 localStorage를 사용하여 해결할수 있습니다.
변경된 state의 todo값을 localStorage에 저장시키면 새로고침을 하여도 localStorage에 저장된 데이터를 불러오게 됩니다.

바뀌어야 할 부분은 다음과 같습니다.

1. 처음으로 값을 불러올때, localStorage에 값이 있으면 state를 수정하여 초기값을 보여주기.
2. 투두를 추가할때 localStorage에도 같이 추가.
3. 투두를 삭제할때 localStorage에도 같이 삭제.
4. 투두를 수정할때 localStorage에도 같이 수정.

이제 순서대로 코딩을 해보겠습니다.

### 1. 처음으로 값을 불러올때, localStorage에 값이 있으면 state를 수정하여 초기값을 보여주기.

`containers/TodoContainer.js`

```jsx
...

componentDidMount() {
	const todoStorage = localStorage.getItem('todos');
}

...
```

위와같이 TodoContainer에 React의 lifecycle API인 componentDidMount를 사용하여 localStorage에서 'todos'라는 이름으로 저장된 값을 가져옵니다.

```jsx
componentDidMount() {
	const todoStorage = localStorage.getItem('todos');
	if(!todoStorage) {
	    localStorage.setItem('todos', JSON.stringify(this.state.todos));
	    return;
	}
}
```

그리고 todoStorage 값이 없다면, localStorage에 현재 state의 todos 값을 저장합니다. 그리고 return을 하여 이후는 실행하지 않습니다.

로컬스토리지에 값을 저장할때엔,

```js
localStorage.setItem('저장할 변수명', string 형태의 값);
```

과 같이 저장해야 합니다. localStorage에 저장된 값은 모두 string형태의 값이기 때문이죠.

따라서 state의 todos를 JSON.stringify 를 사용하여 string 형태로 만든후 저장시켜줍니다.

JSON.stringify 가 하는일은 자바스크립트가 JSON 형태의 데이터를 모두 string 으로 만들어 주는 역할을 합니다.

![Imgur](https://i.imgur.com/iDwIG90.png)

위 이미지처럼 크롬 개발자 콘솔을 열어서 현재 초기 todos 상태를 가져와서 변수에 저장후, JSON.stringify를 해보면 어떤식으로 바뀌는지 바로 알수 있습니다.

또한, 로컬스토리지에서 값을 가져올때에는,

```js
const foo = localStorage.getItem('저장된 변수명');
```

위와같이 값을 가져옵니다. 물론 당연히 가져온 값도 모두 string형태의 값이기 때문에, JSON형태의 값을 저장하였다면, JSON.parse로 다시 JSON형태로 파싱하여 가져와야합니다.

```js
const foo = localStorage.getItem('저장된 변수명');
const bar = JSON.parse(foo);
const baz = JSON.parse(localStorage.getItem('저장된 변수명'));
```

위와같이 말이죠.

이제 다시 프로젝트로 돌아와서 다시 작업을 진행하겠습니다.

```jsx
    componentDidMount() {
        const todoStorage = localStorage.getItem('todos');
        if(!todoStorage) {
            localStorage.setItem('todos', JSON.stringify(this.state.todos));
            return;
        }

        this.setState({
            ...this.state,
            todos: JSON.parse(todoStorage)
        });
    }
```

만약 localStorage에 이미 todos라는 이름으로 저장된 값이 있다면, 그것을 불러와 state를 바꾸어줍니다.

자 이제 새로고침을 해보면, 아래와 같이 localStorage에 값이 저장되있음을 알수있습니다.

![Imgur](https://i.imgur.com/H3DoeSF.png)

### 2. 투두를 추가할때 localStorage에도 같이 추가.

이제 투두를 추가할때에도 localStorage값이 변경되어야 새로고침하여도 값이 유지가되겠죠?

`TodoContainer.js`

```jsx
insertTodo = () => {
  const { todoInput, todos } = this.state;
  const newTodos = todos.concat({
    id: todos.length === 0 ? 0 : todos[todos.length - 1].id + 1,
    title: todoInput,
    isEditing: false,
  });
  this.setState({
    ...this.state,
    todos: newTodos,
    todoInput: '',
  });

  localStorage.setItem('todos', JSON.stringify(newTodos));
};
```

기존에 작성되있던 insertTodo 함수의 내용을 위와같이 조금 바꿔보겠습니다.
newTodos 라는 변수를 사용한 이유는, `localStorage.setItem("todos", this.state.todos)`를 하면, 변경되지 않은 state값이 저장되므로, 로컬스토리지에는 새로운 todo 값이 저장되지 않습니다. 따라서 변수를 만들어서 새로운 todo가 추가된 값을 저장한후, 그것으로 setState 밑 로컬스토리지에 저장해야 합니다.

이제 값을 추가 하고, 새로고침 해도 값이 유지가되는것을 알수 있습니다.

### 3. 투두를 삭제할때 localStorage에도 같이 삭제.

`TodoContainer.js`

```jsx
removeTodo = id => {
  const { todos } = this.state;
  const removedTodos = todos.filter(todo => todo.id !== id);
  this.setState({
    ...this.state,
    todos: todos.filter(todo => todo.id !== id),
  });

  localStorage.setItem('todos', JSON.stringify(removedTodos));
};
```

기존의 removeTodo도 아까와 같은 흐름으로 다시 작성해줍니다. 삭제를 하고 새로고침하여도, 삭제된 값으로 유지되는것을 볼수있습니다.

### 4. 투두를 수정할때 localStorage에도 같이 수정.

`TodoContainer.js`

```jsx
onToggleEdit = id => {
  const { todos } = this.state;
  // 토글된 투두만을 골라내어 나머지값들은 유지하고, isEditing 값만 반대로 바꾸어줍니다.
  // 나머지 투두들은 모두 isEditing을 false로 바꾸어줍니다.
  const toggledTodos = todos.map(todo => {
    if (todo.id === id) {
      return {
        ...todo,
        isEditing: !todo.isEditing,
      };
    }

    return {
      ...todo,
      isEditing: false,
    };
  });

  this.setState({
    ...this.state,
    todos: toggledTodos,
  });

  localStorage.setItem('todos', JSON.stringify(toggledTodos));
};
```

이것또한 흐름은 위 작업들과 같습니다. 변경된 값을 localStorage에 집어넣기만 하면 됩니다.

이 챕터의 작업은 https://github.com/slave4dead/todo-react/tree/7.localStorage 에서 확인할수 있습니다.
