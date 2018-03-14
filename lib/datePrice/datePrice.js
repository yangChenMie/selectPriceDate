function datePrice(option) {
    var startDateP=option.startDate?option.startDate:new Date(),
        endDateP=option.endDateP?option.endDateP:'',
        callback=option.callback?option.callback:'',
        $dom=option.$dom?option.$dom:'',
        allData=option.allData?option.allData:[],
        monthNum=option.monthNum?option.monthNum:'';

    var htmls="";
    htmls+="<div class='headerWrapper' style='height: 50px; line-height: 50px; position: relative;'>\n" +
        "        <div class='headerTip' style='text-align: center; line-height: 50px;'>请选择起飞日期</div>\n" +
        "    </div>\n" +
        "    <table class='dateZone'>\n" +
        "        <tbody>\n" +
        "        <tr>\n" +
        "            <td class='colo'>日</td>\n" +
        "            <td>一</td>\n" +
        "            <td>二</td>\n" +
        "            <td>三</td>\n" +
        "            <td>四</td>\n" +
        "            <td>五</td>\n" +
        "            <td class='colo'>六</td>\n" +
        "        </tr>\n" +
        "        </tbody>\n" +
        "    </table>"+
        "    <div class='tbody tbodyMain'>";
            htmls+="</div>";
            $($dom).append(htmls);
    var currentDate = startDateP;
    currentDate.setMonth(currentDate.getMonth());
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth();
    var yf = currentMonth + 1;
    if(currentMonth+monthNum<12){
        initDom(currentYear,yf,monthNum,allData,currentDate);
    }else{
        initDom(currentYear,yf,12-parseInt(currentMonth),allData,currentDate);
        initDom(parseInt(currentYear)+1,1,parseInt(monthNum)+parseInt(currentMonth)-12,allData);
    }



    $(".cbkDate").on("click",function () {
        var ymd=$(this).attr("d-date").split("-");
        var y=ymd[0],m=ymd[1],d=ymd[2];
        callback(y,m,d);
        $($dom).hide();
        $(".cbkDate").css("background","#fff");
        $(this).css("background","#09F");
    })



}
var isLeapYear= function(year) {
    return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
}
var formatData=function (ss) {
    if(ss<10){
        return ss="0"+ss;
    }else{
        return ss=ss;
    }
}
var initDom=function (startY,startM,num,allDa,startDate) {
    var DaysInMonth = [];
    var html="";
    if (isLeapYear(startY)) {
        DaysInMonth = new Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    } else {
        DaysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    }
    for(var q=startM;q<startM+num;q++){
        var setcurrentDate = new Date(startY, q-1, 1);
        var firstDay = setcurrentDate.getDay();
        if(q==startM&&startDate){
            var flag=1;
        }else{
            var flag=0;
        }
        if (q < 10) {
            html+='<p class="ny1">'+startY + '年' + '0' + q + '月'+'</p><table class="dateTable">';
        } else {
            html+='<p class="ny1">'+startY + '年' + q + '月'+'</p><table class="dateTable">';
        }
        var Ntd = firstDay + DaysInMonth[q-1];
        var Ntr = Math.ceil(Ntd / 7);
        var m=1;
        for (var i = 0; i < Ntr; i++) {
            html+="<tr>";
            for (var j = 0; j < 7; j++) {
                var x=(i)*7+j;
                if((i==0&&j<firstDay)||(i==(Ntr-1)&&x-firstDay>=DaysInMonth[q-1])){
                    html+='<td><p class="oneDay"></p></td>';
                }else{
                    var md=m++;
                    if(flag==1&&md<new Date(startDate).getDate()){
                        html+='<td style="background: rgb(255, 255, 255); color: #9a9a9a;"><p class="oneDay">'+md+'</p></td>';
                    }else{
                        var price=allDa[startY+"-"+formatData(q)+"-"+formatData(md)]?allDa[startY+"-"+formatData(q)+"-"+formatData(md)]:'查看';
                        html+="<td class='cbkDate' d-date='"+startY+"-"+formatData(q)+"-"+formatData(md)+"'><p class='oneDay'>"+ md +"</p><p class='fontSize-1 redStateFont'>"+price+"</p></td>";
                    }
                }
            }
            html+="</tr>";
        };

        html+='</table>';

    }
    $(".tbodyMain").append(html);
    var numDate=startY+"-"+formatData(new Date(startDate).getMonth()+1)+"-"+formatData(new Date(startDate).getDate());
    $(".cbkDate[d-date="+numDate+"]").css("background","#09F")
}