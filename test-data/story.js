const story1 = [
  {
    entityId: '1',
    createdBy: 'abc',
    createdDate: new Date().toISOString(),
    status: 'ACTIVE',
    taleId: '1',
    title: 'test title',
    content: 'lorem ipsum',
    storyOrder: 1,
    hasDraft: false
  },
  {
    entityId: '2',
    createdBy: 'abc',
    createdDate: new Date().toISOString(),
    status: 'ACTIVE',
    taleId: '1',
    title: 'test title',
    content: 'lorem ipsum',
    storyOrder: 2,
    hasDraft: false
  },
  {
    entityId: '3',
    createdBy: 'abc',
    createdDate: new Date().toISOString(),
    status: 'ACTIVE',
    taleId: '1',
    title: 'test title',
    content: 'lorem ipsum',
    storyOrder: 3,
    hasDraft: false
  }
]

const story2 = [
  {
    entityId: '1',
    createdBy: 'abc',
    createdDate: new Date().toISOString(),
    status: 'ACTIVE',
    taleId: '2',
    title: 'test title',
    content: 'lorem ipsum',
    storyOrder: 1,
    hasDraft: false
  },
  {
    entityId: '2',
    createdBy: 'abc',
    createdDate: new Date().toISOString(),
    status: 'ACTIVE',
    taleId: '2',
    title: 'test title',
    content: 'lorem ipsum',
    storyOrder: 2,
    hasDraft: false
  },
  {
    entityId: '3',
    createdBy: 'abc',
    createdDate: new Date().toISOString(),
    status: 'ACTIVE',
    taleId: '2',
    title: 'test title',
    content: 'lorem ipsum',
    storyOrder: 3,
    hasDraft: false
  }
]

const story3 = [
  {
    entityId: '1',
    createdBy: 'abc',
    createdDate: new Date().toISOString(),
    status: 'ACTIVE',
    taleId: '3',
    title: 'test title',
    content: 'lorem ipsum',
    storyOrder: 1,
    hasDraft: false
  },
  {
    entityId: '2',
    createdBy: 'abc',
    createdDate: new Date().toISOString(),
    status: 'ACTIVE',
    taleId: '3',
    title: 'test title',
    content: 'lorem ipsum',
    storyOrder: 2,
    hasDraft: false
  },
  {
    entityId: '3',
    createdBy: 'abc',
    createdDate: new Date().toISOString(),
    status: 'ACTIVE',
    taleId: '3',
    title: 'test title',
    content: 'lorem ipsum',
    storyOrder: 3,
    hasDraft: false
  }
]

const story4 = [
  {
    entityId: '1',
    createdBy: 'abc',
    createdDate: new Date().toISOString(),
    status: 'ACTIVE',
    taleId: '4',
    title: 'test title',
    content: 'lorem ipsum',
    storyOrder: 1,
    hasDraft: false
  },
  {
    entityId: '2',
    createdBy: 'abc',
    createdDate: new Date().toISOString(),
    status: 'ACTIVE',
    taleId: '4',
    title: 'test title',
    content: 'lorem ipsum',
    storyOrder: 2,
    hasDraft: false
  },
  {
    entityId: '3',
    createdBy: 'abc',
    createdDate: new Date().toISOString(),
    status: 'ACTIVE',
    taleId: '4',
    title: 'test title',
    content: 'lorem ipsum',
    storyOrder: 3,
    hasDraft: false
  }
]

const story5 = [
  {
    entityId: '1',
    createdBy: 'abc',
    createdDate: new Date().toISOString(),
    status: 'ACTIVE',
    taleId: '5',
    title: 'test title',
    content: 'lorem ipsum',
    storyOrder: 1,
    hasDraft: false
  },
  {
    entityId: '2',
    createdBy: 'abc',
    createdDate: new Date().toISOString(),
    status: 'ACTIVE',
    taleId: '5',
    title: 'test title',
    content: 'lorem ipsum',
    storyOrder: 2,
    hasDraft: false
  },
  {
    entityId: '3',
    createdBy: 'abc',
    createdDate: new Date().toISOString(),
    status: 'ACTIVE',
    taleId: '5',
    title: 'test title',
    content: 'lorem ipsum',
    storyOrder: 3,
    hasDraft: false
  }
]

const draftStory = [
  {
    entityId: '1',
    createdBy: 'abc',
    createdDate: new Date().toISOString(),
    status: 'ACTIVE',
    taleId: '1',
    title: 'test title',
    content: 'lorem ipsum',
    hasDraft: false
  }
]

const draftEditStory = [
  {
    entityId: '1',
    createdBy: 'abc',
    createdDate: new Date().toISOString(),
    status: 'ACTIVE',
    taleId: '1',
    storyId: '2',
    title: 'test title',
    content: 'lorem ipsum',
    hasDraft: false
  }
]

const sample = `<h1>Vuejs <b>Medium Editor</b></h1>\
          <div class="editor-image is-full"><img src="https://source.unsplash.com/yxNURc8he3o/2000x600"></div>\
          <pre class="hljs javascript" spellcheck="false">axios.interceptors.response.use(<span class="hljs-function"><span class="hljs-keyword"><span class="hljs-function"><span class="hljs-keyword">function</span></span></span><span class="hljs-function"> (</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">response</span></span></span><span class="hljs-function">) </span></span>{<br>  <span class="hljs-keyword"><span class="hljs-keyword">return</span></span> response;<br>}, <span class="hljs-function"><span class="hljs-keyword"><span class="hljs-function"><span class="hljs-keyword">function</span></span></span><span class="hljs-function"> (</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">error</span></span></span><span class="hljs-function">) </span></span>{<br>  <span class="hljs-keyword"><span class="hljs-keyword">const</span></span> originalRequest = error.config;<br>  <span class="hljs-keyword"><span class="hljs-keyword">if</span></span> (error.response.status === <span class="hljs-number"><span class="hljs-number">401</span></span> &amp;&amp; !originalRequest._retry) {<br>    originalRequest._retry = <span class="hljs-literal"><span class="hljs-literal">true</span></span>;<br>    <span class="hljs-keyword"><span class="hljs-keyword">const</span></span> refreshToken = <span class="hljs-built_in"><span class="hljs-built_in">window</span></span>.localStorage.getItem(<span class="hljs-string"><span class="hljs-string">'refreshToken'</span></span>);<br>    <span class="hljs-keyword"><span class="hljs-keyword">return</span></span> axios.post(<span class="hljs-string"><span class="hljs-string">'http://localhost:8000/auth/refresh'</span></span>, { refreshToken })<br>      .then(<span class="hljs-function"><span class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">{data}</span></span></span><span class="hljs-function">) =&gt;</span></span> {<br>        <span class="hljs-built_in"><span class="hljs-built_in">window</span></span>.localStorage.setItem(<span class="hljs-string"><span class="hljs-string">'token'</span></span>, data.token);<br>        <span class="hljs-built_in"><span class="hljs-built_in">window</span></span>.localStorage.setItem(<span class="hljs-string"><span class="hljs-string">'refreshToken'</span></span>, data.refreshToken);<br>        axios.defaults.headers.common[<span class="hljs-string"><span class="hljs-string">'Authorization'</span></span>] = <span class="hljs-string"><span class="hljs-string">'Bearer '</span></span> + data.token;<br>        originalRequest.headers[<span class="hljs-string"><span class="hljs-string">'Authorization'</span></span>] = <span class="hljs-string"><span class="hljs-string">'Bearer '</span></span> + data.token;<br>        <span class="hljs-keyword"><span class="hljs-keyword">return</span></span> axios(originalRequest);<br>      });<br>  }<br>  <span class="hljs-keyword"><span class="hljs-keyword">return</span></span> <span class="hljs-built_in"><span class="hljs-built_in">Promise</span></span>.reject(error);<br>});</pre>\
          <div class="editor-image-description">righteous indignation and dislike</div>\
          <p>But I must explain to you how all this mistaken idea of denouncing <b>pleasure and praising pain was born and I will give you</b> a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes</p><p class="editor-embed">\
            <a href="https://gist.github.com/Culttm/a8c3ca85032c4b0cc67037425f150c44">https://gist.github.com/Culttm/a8c3ca85032c4b0cc67037425f150c44</a>
            <div class="gist-embed-iframe"><iframe id="YTz6XPaotipClIjV5DkalBiGlhBlarw2" height="567px"></iframe></div>
            </p>
            <p></p><p class="editor-embed"><br></p><p></p><ul><li>But I must explain to you how all this mistaken idea of denouncing</li><li>of pleasure of the moment, so blinded by desire</li></ul><p></p>
          <p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will</p><p class="editor-embed">
            <a href="https://gist.github.com/Culttm/a8c3ca85032c4b0cc67037425f150c44">https://gist.github.com/Culttm/a8c3ca85032c4b0cc67037425f150c44</a>
            <div class="gist-embed-iframe"><iframe id="8NlVNRNEJEMoAOogchsvhZyUXYd4rbsb" height="567px"></iframe></div>
            </p>
            <p></p>
            <p></p>
            <p></p><p class="editor-embed"><br></p>
          <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariaturasdasdasdasd<br></p>
          <h2>Section 1.10.33</h2>
          <div class="editor-image is-normal"><img src="https://source.unsplash.com/DKnXlH_r3x4/2000x800"></div>
          <div class="editor-image-description">you how all this mistaken idea of denouncing pleasure</div>
          <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus</p><p class="editor-embed">
            <a href="https://gist.github.com/Culttm/a8c3ca85032c4b0cc67037425f150c44">https://gist.github.com/Culttm/a8c3ca85032c4b0cc67037425f150c44</a>
            <div class="gist-embed-iframe"><iframe id="Kl0fa6lYPCmmX62vp1VFODzleSknRZFL" height="567px"></iframe></div>
            </p>
            <p></p>
            <p></p>
            <p></p><p class="editor-embed"><br></p><p></p><ol><li>cum soluta nobis est eligendi optio cumque</li><li>righteous indignation and dislike</li></ol><p></p><h3>odio dignissimos ducimus</h3>
          <p></p>
          <div class="editor-image is-expand"><img src="https://source.unsplash.com/-g7axSVst6Y/1600x600">
          </div>
          <div class="editor-image-description">I will give you a complete account of the system</div>
          <p></p>
          <p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of wills</p>
          <p class="editor-video">
            </p><div class="video-embed-iframe"><iframe id="IHW3m64yRzV5ZJ6HiIKrB40TuH5pjBt1" height="500" title="Video IHW3m64yRzV5ZJ6HiIKrB40TuH5pjBt1" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" src="https://www.youtube.com/embed/OrT0tHGXyqE"></iframe></div>
            <p></p>
            <p class="editor-video"><br></p>`

export default {
  story1,
  story2,
  story3,
  story4,
  story5,
  draftEditStory,
  draftStory,
  sample
}
