# ※ reat style
## 컴포넌트 스타일링

## 1. 일반 CSS 방식
원래 방식이랑 동일하다.

## 2. Sass
### 2.1 sass 기본 설명
- Sass는 두 가지 확장자 .scss 와 sass를 지원한다.
- .sass는 중괄호와 세미콜론을 사용하지 않는다.
- sass를 사용할려면 node-sass 라이브러리를 설치해야한다.
- sass를 css로 변환해준다.
<pre><code>
$ yarn add node-sass
</code></pre>

### 2.1 sass-loader 설정 커스터마이징
- @import 할 때 프로젝트에 디렉토리가 많이 만들어져서 구조의 깊이가 깊어지면 상위폴더에 한참 올라가야한다.
- 그렇기 때문에 yarn eject 명령어를 사용해서 세부 설정을 밖으로 꺼내 주어야 한다.
- yarn eject 할시 commit 후 사용 필수!
<pre><code>
$ yarn eject
</code></pre>
- webpack.config.js에서 sassRegex를 찾아서 아래와 같이 변경해준다.
<pre><code>
            {
              test: sassRegex,
              exclude: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                }).concat({
                  loader : require.resolve('sass-loader'),
                  options:{
                    sassOptions:{
                      includePaths:[paths.appSrc + '/styles']
                    },
                    sourceMap:isEnvProduction && shouldUseSourceMap,
                  }
                }),
                sideEffects: true
            },
</code></pre>
- 저장 후, 서버를 재실행할 때, 실행이 재대로 안된다면 node_modules 디렉터리 삭제 후, yarn install => yarn start 수행

## 3. CSS Module
- CSS를 불러와서 사용할 때 클래스 이름을 고유한 값, [파일 이름]_[클래스 이름]_[해시값] 형태로 자동으로 만들어서 컴포넌트 스타일 클래스 이름이 중첩되는 현상을 방지해주는 기술.
- .module.css 확장자로 저장.

## 4. Styled-components
- 자바스크립트 파일 안에 스타일을 선언하는 방식 (CSS-in-js)
- .css or .scss 확장자를 가진 스타일 파일을 따로 만들지 않아도 된다.
- src/StyledComponent.ks 파일
- VScode 마켓플레이스에서 vscode-style-components 다운
<pre><code>
$ yarn add styled-components
</pre></code>
- Tagged 템플릿 리터럴을 사용하면 자바스크립트 객체나 함수의 원본 값을 그대로 추출 가능. (props 쉽게 조회)
- props에 따른 조건부 스타일링 가능.
