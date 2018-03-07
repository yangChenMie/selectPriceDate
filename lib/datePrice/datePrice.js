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

    var currentDate = startDateP;
    currentDate.setMonth(currentDate.getMonth());
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth();
    var yf = currentMonth + 1;
    var DaysInMonth = [];
    if (isLeapYear(currentYear)) {
        DaysInMonth = new Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    } else {
        DaysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    }
        for(var q=yf;q<yf+monthNum;q++){
            var setcurrentDate = new Date(currentYear, q-1, 1);
            var firstDay = setcurrentDate.getDay();
            if(q==yf){
                var flag=1;
            }else{
                var flag=0;
            }
            if (q < 10) {
                htmls+='<p class="ny1">'+currentYear + '年' + '0' + q + '月'+'</p><table class="dateTable">';
            } else {
                htmls+='<p class="ny1">'+currentYear + '年' + q + '月'+'</p><table class="dateTable">';
            }
            var Ntd = firstDay + DaysInMonth[q-1];
            var Ntr = Math.ceil(Ntd / 7);
            var m=1;
            for (var i = 0; i < Ntr; i++) {
                htmls+="<tr>";
                for (var j = 0; j < 7; j++) {
                    var x=(i)*7+j;
                    if((i==0&&j<firstDay)||(i==(Ntr-1)&&x-firstDay>=DaysInMonth[q-1])){
                        htmls+='<td><p class="oneDay"></p></td>';
                    }else{
                        var md=m++;
                        if(flag==1&&md<new Date(currentDate).getDate()){
                            htmls+='<td style="background: rgb(255, 255, 255); color: #9a9a9a;"><p class="oneDay">'+md+'</p></td>';
                        }else{
                            var price=allData[0][currentYear+"-"+formatData(q)+"-"+formatData(md)]?allData[0][currentYear+"-"+formatData(q)+"-"+formatData(md)]:'查看';
                            htmls+="<td class='cbkDate' d-date='"+currentYear+"-"+formatData(q)+"-"+formatData(md)+"'><p class='oneDay'>"+ md +"</p><p class='fontSize-1 redStateFont'>"+price+"</p></td>";
                        }
                    }
                }
                htmls+="</tr>";
            };

            htmls+='</table>';
        }

    htmls+="</div>";
    $($dom).append(htmls);

    $(".cbkDate").on("click",function () {
        var ymd=$(this).attr("d-date").split("-");
        var y=ymd[0],m=ymd[1],d=ymd[2];
        callback(y,m,d);
        $($dom).hide();
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