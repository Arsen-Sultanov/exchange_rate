$(
    function(){
        var iterNewsStart = 0;
        var iterNewsEnd = 6;
       
        function newData(){
            $.ajax({
                url: 'http://localhost:3000/get?start=' + iterNewsStart + '&end=' + iterNewsEnd,
                error: function(){
                    alert("eror!");
                },
                success: function(data){
                    console.clear();
                    iterNewsStart += data.length;
                    iterNewsEnd += data.length;
                    if(data == "результатов нет")  return;
                    renderNews(data);
                }
            });
        };

        function moreInfo(id){
            $.ajax({
                url: 'http://localhost:3000/more?id=' + id.toString(),
               error: function(){
                    alert("eror!");
                },
                success: function(data){
                    console.clear();
                    if(data == "результатов нет")  return;
                    $("#content").empty();
                    $("#more").text("Назад")
                    $("#more").click(function(){
                        location.reload();
                    });
                    renderMoreNews(data);
                    
                }
            });
        };
       
        function renderNews(obj){
            var tmpStrinHtml = "";
            
            for(var i = 0; i<obj.length; i++){
                tmpStrinHtml +=
                    '<div class="row ">'+
                        '<div class="state col-md-8">'+
                            '<div class="row">'+
                                    '<div class="col-md-12"> <h2>' + obj[i].title + '</h2></div>'+
                            '</div>'+
                            '<div class="row desc">'+
                                    '<div class="col-md-12">' + obj[i].content.slice(0,100) + ' ...' + '</div>'+
                            '</div>'+
                            '<div class="row">'+
                                '<div class="col-md-12 text-right">'+
                                    '<button value="' + obj[i].id_news +'">Подробнее</button>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'
            }
            $("#content").append(tmpStrinHtml);
        }

        function renderMoreNews(obj){
            var tmpStrinHtml = "";
            
            for(var i = 0; i<obj.length; i++){
                tmpStrinHtml +=
                    '<div class="row ">'+
                        '<div class="state col-md-8">'+
                            '<div class="row">'+
                                    '<div class="col-md-12"> <h2>' + obj[i].title + '</h2></div>'+
                            '</div>'+
                            '<div class="row desc">'+
                                    '<div class="col-md-12">' + obj[i].content + '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'
            }
            $("#content").append(tmpStrinHtml);
        }
        
        newData();

        $("#more").click(function(){
            newData();
        });

        $("#content").click(function(event){
            moreInfo(event.target.value);
        });

    }
)