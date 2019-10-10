

function showNumberWithAnimation(i, j, randNumber) {
    var numberCell = $('#number_cell_' + i + "_" + j);
 
    numberCell.css('background-color', getNumberBackgroundColor(randNumber));
    numberCell.css('color', getNumberColor(randNumber));
    numberCell.text(randNumber);
 
    numberCell.animate({
        width: "100px",
        height: "100px",
        top: getPosition(i),
        left: getPosition(j)
    }, 50);
}
 
// --------------------------------------------------------------------------------------------------------------------
/* 移動數字動畫：
 * 從 x=fromx,y=fromy 的位置 移动到  x=tox,y=toy 的位置
 * 顯示過程中 設置了一个200毫秒的动画效果
 */
function  showMoveAnimation(fromx, fromy, tox, toy){
    var numberCell = $('#number_cell_' + fromx + '_' +fromy );
    numberCell.animate({
        top:getPosition( tox ),
        left:getPosition( toy )
    },200);
}
 
// --------------------------------------------------------------------------------------------------------------------
// 分數刷新顯示
function  UpdateScore(score){
    $('#score').text(score);
}
 