<template>
  <div class='container'>
    <div class='route'>
      <input class='route-path' placeholder='Path' v-model='route.path'>
      <input class='route-method' placeholder='Method' v-model='route.method'>
    </div>

    <div class='editor'>
      <textarea ref='textarea'></textarea>
    </div>
  </div>
</template>

<script>
  import CodeMirror from 'codemirror'
  import 'codemirror/mode/javascript/javascript'

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
      route (route) {
        this.editor.setValue(route.response)
      }
    },

    mounted () {
      this.editor = initCodeMirror(this.$refs.textarea)
      this.editor.on('change', () => {
        this.route.response = this.editor.getValue()
      })
    }
  }
</script>

<style lang='scss' scoped>
  @import '~@/styles/variables';
  @import '~@/styles/mixins';

  .container {
    padding: 24px;
  }

  .route {
    @include card;
    display: flex;
  }

  .route-path {
    flex-grow: 1;
    min-width: 0;
    padding: 0;
  }

  .route-method {
    width: 60px;
    min-width: 0;
    padding: 0;
    margin-left: 16px;
  }

  .editor {
    @include card;
    margin-top: 24px;
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
</style>
