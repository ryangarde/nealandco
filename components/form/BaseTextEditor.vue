<template>
  <div id="editor" class="editor"></div>
</template>

<script>
var Quill;
if (process.client) {
  Quill = require('quill');
}

export default {
  props: ['value'],
  data: () => ({
    editor: null,
  }),

  computed: {
    form: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },

  mounted() {
    this.editor = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: [
          // [{ font: [] }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          [{ script: 'sub' }, { script: 'super' }],
          ['blockquote', 'code-block'],
          [{ direction: 'rtl' }, { align: [] }],
          ['link', 'image', 'video', 'formula'],
          [{ color: [] }, { background: [] }],
          ['clean'],
        ],
      },
    });

    this.editor.on('editor-change', (event, value) => {
      this.onChange();
    });

    // this.$nextTick(() => {
    //   const delta = this.editor.clipboard.convert(res.summary);
    //     this.editor.setContents(delta, 'silent');
    // });
  },

  methods: {
    onChange() {
      let data = this.editor.container.firstChild.innerHTML;
      this.form = data;
      // let result = data.replaceAll('<li>', '<div class="li">').replaceAll('</li>', '</div>');
      // this.$store.dispatch('resume/update', { [this.field]: data });
    },

    updateText(text) {
      if (!text) {
        this.editor.setText('');
        this.form = null;
        return;
      }
      // let cleanText = text.replace(`<span class="theme--text"><strong>`, '').replace('</strong></span>', '');
      let cleanText = text?.replace(/(<([^>]+)>)/gi, '');
      this.editor.insertText(this.editor.getLength() != 1 ? this.editor.getLength() : 0, cleanText);
      this.form = this.editor.container.firstChild.innerHTML;
      // this.$store.dispatch('resume/update', { [this.field]: this.editor.container.firstChild.innerHTML });
    },
  },

  beforeDestroy() {
    this.editor.off('editor-change');
  },
};
</script>

<style lang="scss" scoped>
.editor {
  height: 20rem;
  border-width: 1.5px;
  border-radius: 0 0 0.4rem 0.4rem;
}
</style>