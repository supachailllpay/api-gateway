<template>
  <div class='right-pane'>
    <template v-if='route'>
      <div class='roe'>
        <input class='roe-p' type='text' placeholder='Path' v-model='route.path'>
        <element-select class='roe-m' right
          label='Method'
          v-model='route.method'
          :options='[
            { label: "any", value: ".*" },
            { label: "get", value: "get" },
            { label: "post", value: "post" },
            { label: "put", value: "put" },
            { label: "patch", value: "patch" },
            { label: "delete", value: "delete" }
          ]'>
        </element-select>
      </div>

      <div class='res'>
        <div class='res-h'>
          <element-select
            label='Type'
            v-model='route.type'
            :options='[
              { label: "json", value: "json" },
              { label: "proxy", value: "proxy" },
              { label: "function", value: "function" }
            ]'>
          </element-select>
        </div>
        <div class='res-t'>
          <textarea placeholder='Response' ref='textarea'></textarea>
        </div>
      </div>
    </template>

    <template v-else>
      <div class='ept'>ヽ(´▽｀)ノ</div>
    </template>
  </div>
</template>

<script>
  import Vue from 'vue'
  import CodeMirror from 'codemirror'

  import 'codemirror/mode/javascript/javascript'
  import 'codemirror/addon/display/placeholder'

  const initCodeMirror = function (textarea) {
    return CodeMirror.fromTextArea(textarea, {
      mode: 'javascript',
      tabSize: 2,
      extraKeys: {
        'Tab' (cm) {
          cm.somethingSelected()
            ? cm.indentSelection('add')
            : cm.execCommand('insertSoftTab')
        },
        'Shift-Tab' (cm) {
          cm.indentSelection('subtract')
        }
      }
    })
  }

  export default {
    computed: {
      route () {
        return this.$store.state.selectedRoute
      }
    },

    watch: {
      route () {
        this.updateEditor()
      }
    },

    methods: {
      initEditor () {
        this.editor = initCodeMirror(this.$refs.textarea)
        this.editor.on('change', () => {
          this.route.response = this.editor.getValue()
        })
      },
      updateEditor () {
        if (this.route) {
          Vue.nextTick(() => {
            if (!this.editor) this.initEditor()
            this.editor.setValue(this.route.response || '')
          })
        } else {
          this.editor = null
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import '~@/styles/variables';
  @import '~@/styles/mixins';

  .right-pane {
    padding: 24px;
  }

  .roe {
    display: flex;
    padding: 16px;
    background-color: $color-white;
    border-radius: 4px;
  }

  .roe-p {
    flex-grow: 1;
    min-width: 0;
    padding: 0;
  }

  .roe-m {
    width: 60px;
    min-width: 0;
    padding: 0;
    margin-left: 16px;
  }

  .res {
    margin-top: 24px;
    background-color: $color-white;
    border-radius: 4px;
  }

  .res-h {
    padding: 16px;
    border-bottom: 1px dashed $color-divider;
  }

  .res-t {
    padding: 16px;
  }

  .ept {
    color: $color-divider;
    font-size: 56px;
    text-align: center;
  }
</style>

<style lang='scss'>
  @import '~@/styles/variables';
  @import '~codemirror/lib/codemirror';

  .CodeMirror {
    height: auto;
    color: $color-primary-text;
    background: none;
    font-family: inherit;
    font-size: inherit;
  }

  .CodeMirror-scroll {
    min-height: 240px;
  }

  .CodeMirror pre {
    padding: 0;

    &.CodeMirror-placeholder {
      color: $color-secondary-text;
    }
  }
</style>
