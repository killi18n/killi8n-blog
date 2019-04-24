---
path: '/posts/swift-weak-self'
title: 'Swift의 [weak self]'
date: '2018-07-19'
tags: ['swift', 'weak', 'self']
---

> Swift에서 [weak self]를 쓰는 이유는 무엇일까?

예를 들면,
Swift에서 클로저를 쓸때, View Controller의 UI 컴포넌트를 참조할시, self를 쓰게 된다.

이때, View Controller와 UI 컴포넌트간에는 self라는 키워드로 묶이게 된다.

쉽게 말하자면 서로 간에 강력한 참조를 하게 되는것이다.

이때, [weak self]를 쓰지 않는다면 뒤로 가기 버튼을 눌렀을때,
다른 메모리는 해제 되지만,
ViewController와 UI 컴포넌트사이의 참조는 풀리지 않게되며, 따라서 메모리가 해제되지 않고 찌꺼기로 남게된다.

결국, 앱이 죽는다(메모리 부족현상) 는 가정에 이르게된다.

> ### [weak self]를 사용하여 강한 참조를 해제한다.

따라서 [weak self]를 클로저 내에서 써야 하는데, 이렇게 되면 서로 모두가 강한 참조가 일어나지 않게되어, 메모리가 해제된다는 것이다.
