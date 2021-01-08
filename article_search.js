const articleList = [];

$.get(
	'article_list.json',
	{},
	function(data) {
		data.forEach((row, index) => {
			console.log(row);

			const article = {
				id: row.id,
				regDate: row.regDate,
				writer: row.extra__writer,
				title: row.title,
				body: row.body,
				hit: row.hit,
				likesCount: row.likesCount,
				commentsCount: row.commentsCount
			};

			articleList.push(article);
		});
	},
	'json'
);

new Vue({
  el: "#articleSearchList",
  data: {
    articleList:articleList,
    searchKeyword:''
  },
  methods: {
    update: _.debounce(function(e){
      this.searchKeyword = e.target.value;
    }, 500)
  },
  computed: {
    filterKey:function() {
      return this.searchKeyword.toLowerCase();
    },
    filtered: function() {
      if ( this.filterKey.length == 0 ) {
        return this.articleList;
      }
      
      return this.articleList.filter((row) => {
        if ( row.title.toLowerCase().indexOf(this.filterKey) > -1 ) {
          return true;
        }
        else if ( row.writer.toLowerCase().indexOf(this.filterKey) > -1 ) {
          return true;
        }
        else if ( row.body.toLowerCase().indexOf(this.filterKey) > -1 ) {
          return true;
        }
      });
    }
  }
});