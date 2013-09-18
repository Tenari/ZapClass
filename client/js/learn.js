/*
  $.lesson() is the jQuery plug-in which takes lesson_data and manages the performance of the lesson on the site.
  In other words, this is the top-dog, the big-man, the head-honcho, super-manager library.
  
  Dependencies:
    -$.board()
      -$.lessonWrite()
      -$.lessonAudio()
  
  Common Usage:
    //stuff to get lesson_data from server
    var lesson_manager = $.lesson(lesson_data_object);
    lesson_manager.run();
    
    // OR, even pithier:
    $.lesson(lesson_data).run();
*/
(function($) {
  $.lesson = function(lesson_data, options) {
    var l = {
      data: lesson_data,    // The server-gotten data describing the lesson, hopefully.
      
      // The options for the lesson
      opts: $.extend({
        finish_board_event_name: "finishBoard",
        config: {
                    answer_id:        "#answer",
                    next_button_id:   "#fwd",
                    redo_button_id:   "#redo",
                    back_button_id:   "#back",
                    scribble_id:      "#draw",
                    help_container:   "#audioText",
                    pts_container:    ".whiteboardContainer2",  // Total lesson points
                    paint_container:  ".whiteboardContainer2",  // *Let Me Scribble* probably not the best, but it works
                    alert_container:  ".whiteboardContainer2",  // correct/incorrect alerts
                    popover_container:".whiteboardContainer2",  // points earned popover
                    board_lag:      4000
                  }
      }, options),
      
      // 'Global' variables
      current_board: 0,
      next_pts: 0,
      old_pts: [],
      allow_enter: true,

      board_obj: {},
      
      runLesson: function() {
        // Proper construction check. (make sure it's an array)
        if (Array.isArray(l.data) && l.data.length >0) {
          l.setupInit();
          // Run the first board
          l.board_obj.run();
          // remove the total lessonPts thing
          $('.lessonPts').remove();
        }
        else {
          // was not passed useful data
          alert('No data');
        }
      },
      setupInit: function(){
        
        // reset all our data
        l.current_board = 0;
        l.next_pts = 0;
        l.old_pts = [];
        l.allow_enter = true;
        l.board_obj = {};
        l.total_pts = 0;
        l.start_time = new Date().getTime();

        // add the progress bar to the page.
        $('body').append("<div class='lessonProgressBarContainer'><div class='lessonProgressBar' style='width:0%'></div></div>");

        // initialize the jPlayer for audio
        $('#jp_container_1').show();
        $('#lessonVoice').jPlayer({
          swfpath: "/Jplayer.swf",
          supplied: "mp3, oga"
        });

        l.board_obj = $.board(l.data[l.current_board]);
        $(l.opts.config.pts_container).prepend("<div class='lessonPts' title='Total Lesson Points'></div>");
        $('.lessonPts').tooltip();                    // Activate the tooltip on the current lesson points tally in the right corner.
        
        // Set up the handler for a finished board
        $(document).on("NextBoardPlease", l.runNext);

        // Set up handler for allowing enter keypress
        $(document).on("unblock", function() {
          l.allow_enter = true;
        });
        
        // Set up handlers for control buttons:
        // Step Forward
        $(document).keydown(function(event){           // Set up the 'Enter' handler
          if (event.which == 13 && l.allow_enter){     // Check for 'Enter' keycode
            event.preventDefault();                    // Don't want default actions to occur.
            l.advance();                               // Check the answer.
          }
        });
        $(l.opts.config.next_button_id).click(l.advance); // Set up the "#fwd" click handler
        // Replay
        $(l.opts.config.redo_button_id).click(function(){
          // Run the board again
          l.board_obj.run();
        });
        // Step Back
        $(l.opts.config.back_button_id).click(l.prevBoard);
        // Let Me Scribble!
        $(l.opts.config.draw_id).click(function(){
          $(l.opts.config.paint_container).wPaint({})
        });
      },
      
      // Handles attempts to advance in the lesson.
      advance: function(){
        var result_pts = parseInt(l.board_obj.check(), 10); // '10' means base 10
        l.next_pts = l.next_pts + result_pts;
        l.total_pts = l.total_pts + l.next_pts;
        // result_pts will only be positive on correct answer, so we can trigger finish.
        if (result_pts > 0) {
          l.nextBoard(); 
          // Correct answer notice
          $(l.opts.config.alert_container).append("<div class='alert alert-block alert-success' style='position:absolute;right:26px;top:0'><strong>&#x2713; Correct</strong></div>");
          l.effects.removeAlert();    // smoothly remove the alert.
        } 
        else {
          // Incorrect answer notice
          $(l.opts.config.alert_container).append("<div class='alert alert-block alert-error' style='position:absolute;right:26px;top:0'>&#x2717; Nope.</div>");
          l.effects.removeAlert();    // smoothly remove the alert.
        }
      },
      
      nextBoard: function(){
        // Blocking enter keypress
        l.allow_enter = false;
        // Add the points to the user's account
        if (l.next_pts < 0) {l.next_pts = 0;}         // lower bound the points
        
        // Remember the points
        l.old_pts[l.current_board] = l.next_pts;
        // Calculate total points and clear old number
		
        l.current_board = l.current_board + 1;    // Increment the current_board
        l.board_obj = $.board(l.data[l.current_board]); // construct a new board object
        l.checkForEnd();                          // Ensure the modal shows up on lesson over.

        // popover stuff
        if (l.next_pts != 0){
          $(l.opts.config.popover_container).popover({trigger:"manual", content: ("+"+l.next_pts+"!")}).popover('show');
          setTimeout(function(){$(l.opts.config.popover_container).popover('destroy');}, l.opts.config.board_lag);
        }
        
        l.effects.updateProgressBar(Math.floor((l.current_board / l.data.length)*100));             // The percent completion update
        $('.lessonPts').text(l.total_pts);              // Display the total lesson points earned

        l.next_pts = 0;
      },
      
      prevBoard: function(){
        l.current_board = l.current_board - 1;          // Decrement the current_board
        if(l.current_board < 0){l.current_board = 0;}   // Sanity check on current_board
        l.board_obj = $.board(l.data[l.current_board]); // construct a new board object

        l.total_pts =l.total_pts - l.old_pts[l.current_board];
        l.effects.updateProgressBar(Math.floor((l.current_board / l.data.length)*100));             // The percent completion update
        
        // Then do the previous board
        l.board_obj.run();
      },
      
      runNext: function(){
        // Sanity check
        if (l.data[l.current_board]) {
          // Run the next board
          l.board_obj.run();
        } 
      },
      
      checkForEnd: function() {
        if (!l.data[l.current_board]) {
          $('.lessonProgressBarContainer').remove();
          Session.set('finished', Lessons.insert({
            lesson: Session.get('show') + Session.get('show2') + Session.get('lesson'),
            points_earned: l.total_pts,
            max_points: l.calcMaxPoints(),
            start_time: l.start_time,
            end_time: new Date().getTime()
          }));
        }
      },

      calcMaxPoints: function(){
        var sum = 0;
        _.each(l.data, function(elem, index){
          sum = sum + parseInt(elem.correct.points);
        });
        return sum;
      },
      
      effects: {
        removeAlert: function(){
          setTimeout(function(){                  // The timeout to remove the alert
            $('.alert').fadeOut(333, function(){  // fade it out first
              $('.alert').remove();               // Then remove it. looks nicer.
            });
          }, l.opts.config.board_lag - 333);      // Waits set amount of time minus the time it takes to fade out
        },
        updateProgressBar: function(progress_int){
          $('.lessonProgressBar').animate({width: ""+progress_int+"%"}, 400);
        }
      }
    };

    return {
      run: l.runLesson
    };
  };
})(jQuery);
