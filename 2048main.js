
var score =0;

var board = new Array();
var hasConflicted = new Array();
$(document).ready(function(){

		newgame();

})

function newgame () {

	//初始化方格 init_square function

	init_square();

	//隨機方格產生數字 

	genNumber();
	genNumber();



}

function init_square (){


	// 初始化 方格
	// 生成二維陣列 來 存放數字 及 判斷是否碰撞
	// UpdateBoardView(); 將數字可視覺化 繪圖出來
	// UpdateScore(); 更新分數
	for(var i = 0;i<4;i++)
	{
		for(var j =0 ;j<4;j++)
		{
			var S_cell = $("#cell_" + i + "_" +j);
			
			S_cell.css('top', getPosition(i));
            S_cell.css('left', getPosition(j));
		}
	}




	for(var i =0;i<4;i++)
	{
		board[i] = new Array();
		hasConflicted[i] =new Array();

		for( var j=0;j<4;j++)
		{

			board[i][j] = 0;
			hasConflicted[i][j] = false;
		}

	}

	
	UpdateBoardView();
	score =0 ;
	UpdateScore();

}

function UpdateBoardView(){

    //$(".number-cell").remove();

    for( var i=0 ;i<4;i++)
    {
    	for(var j =0;j<4;j++)
    	{
	    	$('#Square_container').append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');

	    	var theNumberCell = $('#number-cell_'+i+'_'+j);
	    	if (board[i][j] == 0) {
                theNumberCell.css("width", "0px");
                theNumberCell.css("height", "0px");
                theNumberCell.css("top", getPosition(i) + 50);
                theNumberCell.css("left", getPosition(j) + 50);
            } else {
                theNumberCell.css('width', '100px');
                theNumberCell.css('height', '100px');
                theNumberCell.css('top', getPosition(i));
                theNumberCell.css('left', getPosition(j));
                //theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                //theNumberCell.css('color', getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }

            hasConflicted[i][j] = false;

    	}
    }

}

function genNumber(){

	if(nospace(board))
		return false ;

	//隨機產生位子
	var rand_x = parseInt(Math.floor(Math.random() * 4));
	var rand_y = parseInt(Math.floor(Math.random() * 4));

	//限定取亂數次數，如果超過預設次數則改用另一套方式產生亂數，以避免系統超時

	var take_times = 0;

	while (take_times < 50)
	{
		if(board[rand_x][rand_y]==0) //代表該方格可以填入數字
		{
			break;
		}

		rand_x = parseInt(Math.floor(Math.random() * 4));
		rand_y = parseInt(Math.floor(Math.random() * 4));

		take_times ++ ;

	}

	//超過 50 次 用人工方式產生亂數

	if(take_times == 50 )
	{
		for(var i = 0 ;i<4 ; i++) 
		{
			for(var j= 0;j<4 ;j++)
			{
				if(board[i][y]==0)
				{
					rand_x=i;
					rand_y=j;
				}
			}
		}
	}

	//隨機產生一個數字 填入方格中

	var random_number = Math.random();

	if(random_number<0.5)
	{
		random_number =2;
	}
	else
	{
		random_number=4;
	}

	board[rand_x][rand_y]= random_number;

	showNumberWithAnimation(rand_x, rand_y, random_number);

	return true;
}

function isgameover() {
    if (nospace(board) && nomove(board)) {
        gameover();
    }
}
 
function gameover() {
    alert("遊戲結束！您的分數為：" + score);
}
