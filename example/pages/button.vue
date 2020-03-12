<template>
  <div class="app">
    <h2>按钮</h2>
    <div class="show-box">
      <v-button>default</v-button>
      <v-button type="primary">primary</v-button>
      <v-button type="info">info</v-button>
      <v-button type="success">success</v-button>
      <v-button type="danger">danger</v-button>
      <v-button type="warning">warning</v-button>
      <v-button type="text">text</v-button>
    </div>
    <div class="show-box">
      <v-button outlined>outlined</v-button>
      <v-button outlined type="primary">outlined</v-button>
      <v-button outlined type="info">outlined</v-button>
      <v-button outlined type="success">outlined</v-button>
      <v-button outlined type="danger">outlined</v-button>
      <v-button outlined type="warning">outlined</v-button>
    </div>
    <div class="show-box">
      <v-button light>default</v-button>
      <v-button light type="primary">primary</v-button>
      <v-button light type="info">info</v-button>
      <v-button light type="success">success</v-button>
      <v-button light type="danger">danger</v-button>
      <v-button light type="warning">warning</v-button>
    </div>
    <div class="show-box">
      <v-button inverted>default</v-button>
      <v-button inverted type="primary">primary</v-button>
      <v-button inverted type="info">info</v-button>
      <v-button inverted type="success">success</v-button>
      <v-button inverted type="danger">danger</v-button>
      <v-button inverted type="warning">warning</v-button>
      <v-button inverted type="text">text</v-button>
    </div>
    <div class="show-box" style="background:#00d1b2">
      <v-button inverted outlined>default</v-button>
      <v-button inverted outlined type="primary">primary</v-button>
      <v-button inverted outlined type="info">info</v-button>
      <v-button inverted outlined type="success">success</v-button>
      <v-button inverted outlined type="danger">danger</v-button>
      <v-button inverted outlined type="warning">warning</v-button>
      <v-button inverted outlined type="text">text</v-button>
    </div>
    <div class="show-box">
      <v-button type="primary">default</v-button>
      <v-button radius="squared" type="primary">squared</v-button>
      <v-button radius="rounded" type="primary">rounded</v-button>
    </div>
    <div class="show-box">
      <v-button size="small" type="primary">small</v-button>
      <v-button size="normal" type="primary">normal</v-button>
      <v-button size="medium" type="primary">medium</v-button>
      <v-button size="large" type="primary">large</v-button>
    </div>
    <div class="show-box">
      <v-button native-type="button" type="primary">button</v-button>
      <v-button native-type="menu" type="primary">menu</v-button>
      <v-button native-type="reset" type="primary">reset</v-button>
      <v-button native-type="submit" type="primary">submit</v-button>
    </div>
    <div class="show-box">
      <v-button blocked>Blocked</v-button>
    </div>
    <div class="show-box">
      <v-button loading type="primary">
        加载中
      </v-button>
      <v-button inverted type="primary">
        inverted
      </v-button>
    </div>
    <div class="show-box">
      <v-button-group>
        <v-button type="primary">
          <v-icon fa="bold"></v-icon>
        </v-button>
        <v-button type="primary">
          <v-icon fa="italic"></v-icon>
        </v-button>
        <v-button type="primary">
          <v-icon fa="underline"></v-icon>
        </v-button>
      </v-button-group>
    </div>
    <h2>固定</h2>
    <affix>
      <button class="button is-primary">固定在顶部</button>
    </affix>
    <h2>导航</h2>
    <div class="show-box">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <img
              src="https://bulma.io/images/bulma-logo.png"
              width="112"
              height="28"
            />
          </a>

          <a
            role="button"
            class="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item">
              Home
            </a>

            <a class="navbar-item">
              Documentation
            </a>

            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                More
              </a>

              <div class="navbar-dropdown">
                <a class="navbar-item">
                  About
                </a>
                <a class="navbar-item">
                  Jobs
                </a>
                <a class="navbar-item">
                  Contact
                </a>
                <hr class="navbar-divider" />
                <a class="navbar-item">
                  Report an issue
                </a>
              </div>
            </div>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-primary">
                  <strong>Sign up</strong>
                </a>
                <a class="button is-light">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <h2>菜单</h2>
    <div style="width:50%">
      <div class="columns" style="margin-top: 20px; background-color: #f0f0f0;">
        <div class="column is-3">
          <div class="menu">
            <menus label="Administration">
              <menu-item icon="twitter">
                <span>子目录1</span>
                <menus slot="sub">
                  <menu-item
                    :to="{
                      path: '/components/menu/submenu1',
                      query: { userId: 321 }
                    }"
                    icon="qq"
                    :is-active="true"
                    >子子目录1</menu-item
                  >
                  <menu-item icon="google">
                    <span>子子目录2</span>
                    <menus slot="sub">
                      <menu-item icon="home">第三级1</menu-item>
                      <menu-item icon="home">第三级2</menu-item>
                      <menu-item icon="home">
                        <span>第三级3</span>
                        <menus slot="sub" type="float">
                          <menu-item icon="home">第四级1</menu-item>
                        </menus>
                      </menu-item>
                    </menus>
                  </menu-item>
                </menus>
              </menu-item>
              <menu-item icon="wechat" to="/components/menu/submenu2"
                >子目录2</menu-item
              >
              <div class="divider"></div>
              <menu-item icon="facebook" to="/components/menu/submenu3"
                ><span>子目录3</span></menu-item
              >
            </menus>
          </div>
        </div>
      </div>
    </div>
    <h2>步骤条Steps</h2>
    <div class="show-box">
      <steps :current="0" type="line" prev-text="上一步" next-text="下一步">
        <step title="标题" description="举头望明月">
          <p>1.床前明月光，疑是地上霜。举头望明月，低头思故乡</p>
        </step>
        <step title="Eating" description="春晓">
          <p>2.春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。</p>
        </step>
        <step title="Swimming" description="春夜喜雨">
          <p>3.好雨知时节，当春乃发生。随风潜入夜，润物细无声</p>
        </step>
      </steps>
      <steps :current="0" type="pills">
        <step title="标题" description="举头望明月">
          <p>1.床前明月光，疑是地上霜。举头望明月，低头思故乡</p>
        </step>
        <step title="Eating" description="春晓">
          <p>2.春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。</p>
        </step>
        <step title="Swimming" description="春夜喜雨">
          <p>3.好雨知时节，当春乃发生。随风潜入夜，润物细无声</p>
        </step>
      </steps>
    </div>
    <h2>Tabs</h2>
    <div class="show-box">
      <div class="columns">
        <div class="column">
          <tabs>
            <tab-item label="Pictures">Pictures Tab</tab-item>
            <tab-item label="Music">Music Tab</tab-item>
            <tab-item label="Videos">Video Tab</tab-item>
            <tab-item label="Documents">Document Tab2</tab-item>
          </tabs>
        </div>

        <div class="column">
          <tabs type="boxed">
            <tab-item label="Pictures">Pictures Tab</tab-item>
            <tab-item label="Music">Music Tab</tab-item>
            <tab-item label="Videos">Video Tab</tab-item>
            <tab-item label="Documents">Document Tab2</tab-item>
          </tabs>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <tabs type="toggle">
            <tab-item label="Pictures">Pictures Tab</tab-item>
            <tab-item label="Music">Music Tab</tab-item>
            <tab-item label="Videos">Video Tab</tab-item>
            <tab-item label="Documents">Document Tab2</tab-item>
          </tabs>
        </div>
        <div class="column">
          <tabs type="toggle" :is-full-width="true">
            <tab-item label="Pictures" icon="image">Pictures Tab</tab-item>
            <tab-item label="Music" icon="music">Music Tab</tab-item>
            <tab-item label="Videos" icon="film">Video Tab</tab-item>
            <tab-item label="Documents" icon="file-text-o"
              >Document Tab2</tab-item
            >
          </tabs>
        </div>
      </div>
    </div>
    <h2>Alert</h2>
    <div class="show-box">
      <alert title="well done!" type="primary">
        Well done! You successfully read this important alert message.
      </alert>
    </div>

    <h2>模态框</h2>
    <v-aside :is-show="isShow" title="Left Aside!" @close="isShow = false">
      <h3>Dolor sit amet</h3>
      <p>
        Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
        Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
        aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet
        a, venenatis vitae, justo.
      </p>
      <h3>Dolor sit amet</h3>
      <p>
        Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
        Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
        aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet
        a, venenatis vitae, justo.
      </p>
    </v-aside>
    <button @click="isShow = true" class="button is-primary">左侧模态框</button>

    <v-aside
      :is-show="isShowRight"
      title="Right Aside!"
      :show-footer="false"
      placement="right"
      :backdrop="false"
      @close="isShowRight = false"
    >
      <h3>Dolor sit amet</h3>
      <p>
        Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
        Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
        aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet
        a, venenatis vitae, justo.
      </p>
      <h3>Dolor sit amet</h3>
      <p>
        Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
        Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
        aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet
        a, venenatis vitae, justo.
      </p>
      <p><code>右侧Aside并且不显示footer</code></p>
    </v-aside>
    <button @click="isShowRight = true" class="button is-primary">
      右侧模态框
    </button>
    <h2>折叠面板</h2>
    <div class="show-box">
      <collapse accordion>
        <collapse-item title="Collapsible Group Item #1"
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum
          dolor sit amet, consectetur adipiscing elit</collapse-item
        >
        <collapse-item title="Collapsible Group Item #2" actived
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum
          dolor sit amet, consectetur adipiscing elit</collapse-item
        >
        <collapse-item title="Collapsible Group Item #3"
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum
          dolor sit amet, consectetur adipiscing elit</collapse-item
        >
      </collapse>
    </div>
    <h2>消息</h2>
    <div class="show-box">
      <button class="button" @click="basicNotify">点击我</button>
      <button class="button is-primary" @click="primaryNotify">点击我</button>
      <button class="button is-info" @click="infoNotify">点击我</button>
      <button class="button is-success" @click="successNotify">点击我</button>
      <button class="button is-warning" @click="warningNotify">点击我</button>
      <button class="button is-danger" @click="dangerNotify">点击我</button>
      <button class="button is-info" @click="loadingNotify">Loading</button>
    </div>
    <h2>Popover</h2>
    <div class="show-box">
      <popover title="Width Popover" :always="false" :width="400">
        <button class="button is-primary">Width Popover!</button>
        <div slot="content">
          <h4>全面、灵活且强大的ui组件</h4>
          <ul>
            <li>
              样式基于<strong>Bulma框架</strong>(Flexbox
              based)，能够轻松布局并可定制化
            </li>
          </ul>
        </div>
      </popover>

      <popover title="free content" :width="500">
        <button class="button is-primary">Free content!</button>
        <div slot="content">
          <img
            class="image"
            src="https://pek3a.qingstor.com/warehouse1/20161205045719651.jpg"
            style="float: left;margin-bottom: 8px"
            width="260"
          />
          <p>
            这里是亚得里亚海，海龙卷自远处黑暗的云层间从天而降，你来掌镜摄影师Ivan
            Stulić在克罗地亚一个小岛上拍下了这张照片。
            “眼前的海龙卷距离左边的船只大概只有50-100米的距离，所幸人员和船只都没事。”他这样说道。
          </p>
        </div>
      </popover>

      <popover
        title="Always Popover"
        content="Duis mollis, est non commodo luctus"
        trigger="hover"
      >
        <button class="button is-info">Trigger Popover!</button>
      </popover>
    </div>
    <h2>时间线TimeLine</h2>
    <div class="show-box">
      <timeline-item>
        <timeline-item date="2 minutes ago" type="primary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          posuere erat a ante soe aiea ose dos soois.
        </timeline-item>
        <timeline-item date="Sat, 5 Mar" type="primary">
          <p>
            adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing
            elit
          </p>
        </timeline-item>
        <timeline-item date="Sun, 11 Feb" type="success">
          Call to customer Jacob and discuss the detail.
        </timeline-item>
      </timeline-item>
    </div>
    <h2>表单Form</h2>
    <div class="show-box">
      <label class="label">Name</label>
      <p class="control">
        <input class="input" type="text" placeholder="Text input" />
      </p>
      <label class="label">Username</label>
      <p class="control has-icon has-icon-right">
        <input
          class="input is-success"
          type="text"
          placeholder="Text input"
          value="bulma"
        />
        <i class="fa fa-check"></i>
        <span class="help is-success">This username is available</span>
      </p>
      <label class="label">Email</label>
      <p class="control has-icon has-icon-right">
        <input
          class="input is-danger"
          type="text"
          placeholder="Email input"
          value="hello@"
        />
        <i class="fa fa-warning"></i>
        <span class="help is-danger">This email is invalid</span>
      </p>
      <label class="label">Subject</label>
      <p class="control">
        <span class="select">
          <select>
            <option>Select dropdown</option>
            <option>With options</option>
          </select>
        </span>
      </p>
      <label class="label">Message</label>
      <p class="control">
        <textarea class="textarea" placeholder="Textarea"></textarea>
      </p>
      <p class="control">
        <label class="checkbox">
          <input type="checkbox" />
          Remember me
        </label>
      </p>
      <p class="control">
        <label class="radio">
          <input type="radio" name="question" />
          Yes
        </label>
        <label class="radio">
          <input type="radio" name="question" />
          No
        </label>
      </p>
      <p class="control">
        <button class="button is-primary">Submit</button>
        <button class="button is-link">Cancel</button>
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class TestPage extends Vue {
  isShowRight: boolean = false;
  isShow: boolean = false;
  basicNotify() {
    this["$notify"].open({ content: "您点击了我！" });
  }
  primaryNotify() {
    this["$notify"].open({ content: "您点击了我！", type: "primary" });
  }
  infoNotify() {
    this["$notify"].info({ content: "您点击了我！" });
  }
  successNotify() {
    this["$notify"].success({ content: "您点击了我！" });
  }
  warningNotify() {
    this["$notify"].warning({ content: "您点击了我！" });
  }
  dangerNotify() {
    this["$notify"].open({ content: "您点击了我！", type: "danger" });
  }
  loadingNotify() {
    this["$notify"].open({ content: "命令执行中...", type: "loading" });
  }
}
</script>
<style>
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 1rem 0;
}
html,
body {
  min-height: 1500px;
  margin: 2rem 0;
}
.show-box {
  width: 99%;
  padding: 1rem 0;
}
</style>
