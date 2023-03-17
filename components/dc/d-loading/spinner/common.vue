<script>
  export default {
    computed: {
      spinnerColor() {
        return '#0081ff';
      },
	  
	  spinnerBgColor() {
	    return '#0081ff';
	  },

      spinnerSize() {
        return (this.size || 28) + 'px';
      }
    },

    props: {
      size: Number,
      color: String
    }
  };
</script>
