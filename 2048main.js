
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
	UpdateScore(score);

}

function UpdateBoardView(){

    $(".number-cell").remove();

    for( var i=0 ;i<4;i++)
    {
    	for(var j =0;j<4;j++)
    	{
	    	$('#Square_container').append('<div class="number-cell" id="number_cell_' + i + '_' + j + '"></div>');

	    	var theNumberCell = $('#number_cell_'+i+'_'+j);
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
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color', getNumberColor(board[i][j]));
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
				if(board[i][j]==0)
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

$(document).keydown(function(event){

	event.preventDefault(); //方法阻止元素發生默認行為（例如，當點擊提交按钮時阻止對表單提交）

	switch(event.keyCode)
	{
		case 37 : //向左
			if(moveLeft()){
				//can move then generate the number ,and judge if isgameover 
				setTimeout("genNumber()",210); 
				setTimeout("isgameover()",300);
			}
			;
			break;
		case 38 : //向上
			if(moveUp()){
				//can move then generate the number ,and judge if isgameover 
				setTimeout("genNumber()",210); 
				setTimeout("isgameover()",300);
			}
			;
			break;
		case 39 : //向右

			if(moveRight()){
				//can move then generate the number ,and judge if isgameover 
				setTimeout("genNumber()",210); 
				setTimeout("isgameover()",300);
			}
			;
			break;
		case 40 : //向下
			if(moveDown()){
				//can move then generate the number ,and judge if isgameover 
				setTimeout("genNumber()",210); 
				setTimeout("isgameover()",300);
			}
			;
			break;

			default:
			break;
	}
})

function moveLeft(){
	//1. 不能向左移動.
	
	if(!canMoveLeft(board))
		return false;
	//2.如果可以向左移動
	// 判斷當前數字是否為 0 ， 如果不為0 就像左邊移動 board[i][j] !=0
	// 如果左側是空格子，則往左邊移動
	//如果當前數字與左側數字不相等，則數字仍然往左位移 noBlockHorizontal
	//如果當前數字與左側數字相等，則進行相加操作

	for(var i =0;i<4;i++)
	{
		for(var j=1;j<4;j++)
		{
			if(board[i][j]!=0) //當前格子不為0
			{
				for(var k =0 ; k<j ; k++) //檢查當前方格的左邊格子
				{
					//1.水平方向沒有數字 (1.空格)
					//目標之左邊格子沒有數字 且 目標之水平間都沒有格子 才可以移動
					if(board[i][k]==0 && noBlockHorizontal(i,k,j,board)){

						showMoveAnimation(i,j,i,k)
						board[i][k]=board[i][j]
						board[i][j]=0

						continue;
					}
					else if (board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k])
					{
						// 2. 水平方向有數字 (1.數字不相等 2. 數字相等)

					showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        UpdateScore(score);
 
                        hasConflicted[i][k] = true;
                        continue;

					}

				}

			}

		}

	}
	setTimeout("UpdateBoardView()", 200);
    return true;

}

function moveUp(){
 
 if (!canMoveUp(board))
        return false;
    //moveUp
    for (var j = 0; j < 4; j++)
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        UpdateScore(score);
 
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    setTimeout("UpdateBoardView()", 200);
    return true;

}

function moveRight(){
	   if (!canMoveRight(board))
        return false;
 
    //moveRight
    for (var i = 0; i < 4; i++)
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        UpdateScore(score);
 
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    setTimeout("UpdateBoardView()", 200);
    return true;

}
function moveDown(){

	 if (!canMoveDown(board))
        return false;
 
    //moveDown
    for (var j = 0; j < 4; j++)
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        UpdateScore(score);
 
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    setTimeout("UpdateBoardView()", 200);
    return true;

}
