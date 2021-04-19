 $("#form").submit(function(){
         var x=$("#form").serialize();
         });
         //end form
         //save and next
		$(".saveandnextitem").click(function(e){
		e.preventDefault();
		 var question=parseInt($(".activequestion").attr('id'));
		  if(question==25){
		 question=0;
		 }
		 var q=".btn"+question;
		  $(q).removeClass("review");
		  $(q).addClass("next");
		  var qid="#"+question;
		  $(qid).addClass("inactive");
		  $(qid).removeClass("activequestion");
		  var nextq=question+1;
		  nextq="#"+nextq;
		  $(nextq).removeClass("inactive");
		  $(nextq).addClass("activequestion");
		 });
		 ///end
		 //review item 
		 $(".reviewitem").click(function(e){
		 e.preventDefault();
		 var question=parseInt($(".activequestion").attr('id'));
		  if(question==25){
		 question=0;
		 }
		 var q=".btn"+question;
		  $(q).removeClass("next");
		  $(q).addClass("review");
		  var qid="#"+question;
		  $(qid).addClass("inactive");
		  $(qid).removeClass("activequestion");
		  var nextq=question+1;
		  nextq="#"+nextq;
		  $(nextq).removeClass("inactive");
		  $(nextq).addClass("activequestion");
		 });
		 //end
		 //back question
		 $(".backitem").click(function(e){
		e.preventDefault();
		 var question=parseInt($(".activequestion").attr('id'));
		 if(question==1){
		 question=26;
		 }
		  var q=".btn"+question;
		 // $(q).addClass("review");
		  var qid="#"+question;
		  $(qid).addClass("inactive");
		  var nextq=question-1;
		  nextq="#"+nextq;
		  $(nextq).removeClass("inactive");
		  $(nextq).addClass("activequestion");
		 });
		 //end back