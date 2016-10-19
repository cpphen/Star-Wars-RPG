$(document).ready(function(){
	//Alternate is to make every html element with jquery then append smallers divs to larger divs. Also make multiple objects 
	//for each character, and then make new elements and assign the object data into them using the .attr(). 
	//Refer to fridge and crystal.
	// var picked = false;
	$('#video').hide();
	
	$('#c1').text("Darth Vader");
	$('#c2').text("Luke Skywalker");
	$('#c3').text("Obi Won");
	$('#c4').text("Darth Maul");
	var health = $('#c1hp').data('hp');
	$('#c1hp').html(health);
	var health2 = $('#c2hp').data('hp');
	$('#c2hp').html(health2);
	var health3 = $('#c3hp').data('hp');
	$('#c3hp').html(health3);
	var health4 = $('#c4hp').data('hp');
	$('#c4hp').html(health4);

	var damage;
	var counter = 0;
	var playerHP;
	var firstRound = true;
	var enemyHP;
	var lose = "You Lose";
	var win = "You Win";
	var counter = 0;
	var defeated = [];


	$('.charContainer').on('click', function(){
		// defeated = [];
	
		$('#your').append($(this));
		if(firstRound == true) //****//Had to have this true/false condition here, so that when the player wins an opponent, the damage that accrued from the first round doesnt get reset and also the hp lost from first round does not get reset
		{
			defeated = [];
			damage = $('#your .charContainer').data('attack');
			playerHP = $('#your .charContainer').data('hpp');
		}

		console.log('before', this);
		$('.characters>.charContainer').each(function(){
			$(this).removeClass('charContainer').addClass('foes');
			$('#enemies').append($(this));
		})
		if($(this).hasClass('foes'))
		{
			$(this).addClass('black');
			$('#fighter').append($(this));
			console.log('after', this)
			counter = $('#fighter .foes').data('cattack');
			enemyHP = $('#fighter .foes').data('hpp');
		}
	
	})

	$('#attack').on('click', function(){
		if($('#your .charContainer').length &&  $('#fighter .foes').length)
		{
			playerHP -= counter;
			console.log(playerHP);
			console.log('damage', damage);
			enemyHP -= damage;
			$('.charContainer .health').html(playerHP);
			$('#fighter .foes .health').html(enemyHP); //For this part I had to be specific of all the containers within containers. Before I had: $('#fighter .foes .health'), I just had $(.foes .health'). The problem with just having $(.foes .health') and not including the id for where the chosen opponent gets appended to was that, when updating the enemyHP and displaying it, it was diaplying for all divs with the class .foes (the enemies in the enemy selection). That is why I ahd to tell the program to only change and dislay the enemyHP of class .foes that has the parent #fighter
			$('.oppName').remove();
			$('.oppName2').remove();
			var newH2 = $('<h2>').addClass('oppName');
			var newH22 = $('<h2>').addClass('oppName2');
			$('.FightProgress').append(newH2);
			$('.FightProgress').append(newH22);
			$('.oppName').html('You attacked ' + $('#fighter .foes').data('name') + ' for ' + damage + ' damage!');
			$('.oppName2').html($('#fighter .foes').data('name') + ' attacked you back for ' + counter + ' damage!');//displaying this line of code in the same h2 with class oppName replaces the first one. Needed to create an extra h2
			damage += 8;
			console.log(enemyHP);
			console.log('cdamage', counter);

			if(playerHP <= 0)
			{
				$('.lose').html(lose);
				$('.lose').show();
				var gameReset = $('<button>' + 'Play Again?' + '</button>').attr('id', 'resetButton'); //ID is an html 
				//attribute so you need to use attr() to add an id name. In this case, an ID called resetButton was added 
				//as an attribute to the button
				$('.lose').append(gameReset);
				defeated.push($('#fighter .foes').detach());
			}
			else if(playerHP > 0 && enemyHP <= 0)
			{
				firstRound = false;
				// $('#fighter .foes').detach();
				$('.oppName2').remove();
				$('.oppName').html('You have defeated ' + $('#fighter .foes').data('name') + ' , select another opponent.');

				defeated.push($('#fighter .foes').detach());
				console.log('defeated', defeated.length);
				if(defeated.length === 3)
				{
					$('.lose').html(win);
					var gameReset = $('<button>' + 'Play Again?' + '</button>').attr('id', 'resetButton');
					$('.lose').append(gameReset);
				}
				// $('#fighter .foes').hide();
			}

		}
			if($('#fighter .foes').length == false)
			{
				$('.oppName2').remove();
				$('.oppName').html('No one here to attack!');
			}
	})

	$( document ).on( 'click', '#resetButton', function() {
		$('.foes').addClass('charContainer').removeClass('foes');
		$('#your .charContainer').removeClass('charContainer').addClass('charContainer')
		$('#your .charContainer').appendTo('.characters');
		$('.charContainer').appendTo('.characters');
		// $('.charContainer').show();
		// defeated.addClass('charContainer').removeClass('foes');
		   $.each(defeated, function(i, defeated) { //The damage and health was not getting reset after all enemies were defeated since I did not set the boolean firstRound to true. See the ****
		   		defeated.addClass('charContainer').removeClass('foes').removeClass('black');
        		$('.characters').append(defeated);
    		});
			health = $('#c1hp').data('hp');
			$('#c1hp').html(health);
			health2 = $('#c2hp').data('hp');
			$('#c2hp').html(health2);
			health3 = $('#c3hp').data('hp');
			$('#c3hp').html(health3);
			health4 = $('#c4hp').data('hp');
			$('#c4hp').html(health4);
		$('.lose').hide();
		$('.oppName').hide();
		$('.oppName2').hide();
		// defeated = [];
		firstRound = true; //****
	});



});