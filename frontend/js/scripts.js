// A COLUMN AND EACH CARD MUST BE A UNIQUE OBJECT - RANDOM STRING PREVENTS THE CREATION OF DUPLICATES

$(function() {
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    };

//CREATING ELEMENTS FROM WHICH THE COLUMN WILL BE COMPOSED 

    function Column(name) {
        var self = this;

        this.id = randomString();
        this.name = name;
        this.$element = createColumn();

        function createColumn() {
            // CREATING COMPONENTS OF COLUMNS
            var $column = $('<div>').addClass('column');
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnLeft = $('<div>').addClass('column-left');
            var $columnRight = $('<div>').addClass('column-right');
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnAddCard = $('<button>').addClass('add-card').text('+');

            // ADDING EVENTS
            $columnAddCard.click(function() {
                var description = prompt("Enter the name of the card");

                if (description) {
                    self.addCard(new Card(description));
                }
                else {
                    alert('You have to put the name of the card. Try again.')
                }
            });

            // CONSTRUCTION OF COLUMN ELEMENT
            $column.append($columnLeft)
                .append($columnRight)
                .append($columnTitle)
                .append($columnCardList)
                .append($columnAddCard);

            $columnRight.append($columnTitle);

            // RETURN OF CREATED COLUMN
            return $column;
        }
    };

    // ADDING A CARD TO THE COLUMN
    Column.prototype = {
        addCard: function(card) {
            this.$element.children('ul').append(card.$element);
        }
    };

    var deleteActiveIcon = "url(zadanie/../pictures/trash.png)";
    var deleteDoneIcon = "url(zadanie/../pictures/trash2.png)";

    function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = description;
        this.$element = createCard();

        function createCard() {
            // CREATING CARD
            var $card = $('<li>').addClass('card');
            var $cardDone = $('<input type="checkbox">').addClass('btn-done');
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
            var $cardDelete = $('<button>').addClass('btn-delete').css('background-image', deleteActiveIcon);
        
            // CHANGING THE STYLE OF THE ELEMENT AFTER CLICKING
            $cardDone.click(function(){
                if ($cardDone.is(':checked')) {
                    $cardDescription.css('color', '#9eb2c0');
                    $cardDescription.css('text-decoration', 'line-through');
                    $cardDelete.css('background-image', deleteDoneIcon);
                } 
                else {
                    $cardDescription.css('color', '#000');
                    $cardDescription.css('text-decoration', 'none');
                    $cardDelete.css('background-image', deleteActiveIcon);
                }
            });

            // BINDING TO CLICK EVENT
            $cardDelete.click(function(){
                self.removeCard();
            });

            // CONSTRUCTION OF CARD ELEMENT
            $card.append($cardDone)
                  .append($cardDescription)
                  .append($cardDelete);

            // RETURN OF CREATED CARD
            return $card;
        }
    };

    // REMOVE CARD
    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
        }
    };

    var board = {
        name: 'Board',
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $('#board .column-container')
    };

    // DRAG'N'DROP FUNCTION 
    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }

    $(".card").click(function(){
        $(".card-placeholder");
    });

    // CREATING COLUMNS
    var todoColumn = new Column('ToDo List');

    // ADDING COLUMNS TO THE BOARD
    board.addColumn(todoColumn);

    // CREATING CARDS
    var card1 = new Card('Make a new post about...');
    var card2 = new Card('Proof read the new post.');
    var card3 = new Card('Publish the new post.');
    var card4 = new Card('Make research for tomorrows post.');
    var card5 = new Card('Take the day off.');
    var card6 = new Card('Go to bed.');

    // ADDING CARDS TO COLUMNS
    todoColumn.addCard(card1);
    todoColumn.addCard(card2);
    todoColumn.addCard(card3);
    todoColumn.addCard(card4);
    todoColumn.addCard(card5);
    todoColumn.addCard(card6);
})