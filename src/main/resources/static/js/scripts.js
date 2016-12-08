$(".answer-write input[type='submit']").click(addAnswer);
$(".qna-comment").on("click", ".delete-answer button[type='submit']", deleteAnswer);

function deleteAnswer(e){
	debugger
	console.log('click delete button');
	e.preventDefault();
	
	var url = $(".delete-answer").attr("action");
	console.log("url : " +url);

	$.ajax({
		type: 'delete',
		url: url,
		error: function(){
			console.log('fail');
		},
		success: function(){
			$(e.currentTarget).closest(".article").remove();
			$("textarea[name=contents]").val("");
		}
	});
	
}

function addAnswer(e){
	console.log('click answer button');
	e.preventDefault();
	
	
	var url = $(".answer-write").attr("action");
	console.log("url : " +url);
	
	var queryString = $(".answer-write").serialize();
	console.log("queryString : " +queryString);
	
	$.ajax({
		type: 'post',
		url: url,
		data: queryString,
		dataType: 'json',
		error: function(){
			console.log('fail');
		},
		success: function(data){
			console.log('json data ' ,data);
			
			var answerTemplate = $("#answerTemplate").html();
			var template = answerTemplate.format(data.writer.userId, data.formattedCreateDate, data.contents, data.question.id,
			data.id);
			$(".qna-comment-slipp-articles").prepend(template);
			$("textarea[name=contents]").val("");
		}
	});

}


String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined'
        ? args[number]
        : match
        ;
  });
};