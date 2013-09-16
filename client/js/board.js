/*
  The $.board jQuery plugin can walk a user through a given json board object.
  When a correct answer is passed, the $.board object fires a custom event called 'finishBoard'.
  Use 'finishBoard' within $.lesson to affect the user's points on the server.
  data notes:
    text:
    input: "none" for no input to be shown.
    
  return {
      run:        b.runBoard,
      check:      b.checkInput,
      board_data: b.data
    }
*/
(function($) {
  $.board = function(board_data) {
    var b = {
      data: $.extend(true, {
        text:   {
          stages: [""],
          stage_lens: [0]
          // can append $.lessonWrite options here=> fade: "false" 
        },
        input:  "number",                             // "NONE" for an input-less board
        audio:  "/sounds/",                           // Name of the src attr in the <audio> tag. MUST follow lessonAudio naming conventions
        help:   "Help Script.",                       // Help-text version of audio file.
        correct:{
          answer: "0",
          points: "1",
          audio:  "/sounds/",
          help:   "Help Script."
        },
        // An array of objects describing possible unique wrong answers.
        // one with answer: "" should always be the last object (and only if there is only one unique wrong answer)
        wrong:  [
          {
            answer: "",                               //default implies "everything but the correct answer" 
            audio:  "/sounds/",
            help:   "Help Script.",
            points: "-1"                              //the amount to add for each wrong answer. (floor 0) (usually a negative number)
          }
        ],
        config: {   help_container: "#audioText",
                    next_button_id: "#fwd", redo_button_id: "#redo",
                    main_container: "#whiteboardContent",
                    finish_writing_event_name: "doneStages",
                    default_wrong_answer: "all",
                    audio_on: true,
                    attempts: "0"}
      }, board_data),
      
/* === Main Control Flow Functionality === */
      // Based on board_data, begins manipulating the DOM to go through the board.
      // See b.data defaults for acceptable board_data format.
      runBoard: function() {
        $('button').attr("disabled", "true");                 // disable the control buttons
        
        // Clear the whiteboard
        $(b.data.config.main_container).html('');             // Not strictly necessary? Not sure.
        
        // Set up a listener to act when the board is done writing stages.
        // This ensures that the input is added only after all the stages are written.
        $(document).off(b.data.config.finish_writing_event_name);             // Clear old handlers.
        $(document).on(b.data.config.finish_writing_event_name, b.addInput);  // Adds the input box for the board
        
        // The 'teaching' part:
        // Play the audio file.
        // This call also has the effect of calling b.writeStages() at the appropriate time (to prevent audio taking a while to load and the stages marching on ahead)
        b.playAudio(b.data.audio, b.data.help);
      },
      
      // Parses the .val() of the input element and checks it against b.data.correct/wrong.answer
      // returns the relative points due to attempted answer.
      checkInput: function(){
        // read the input from the board
        var each;
        var input = $.trim(b.getCurrentInput());
        b.data.config.attempts = parseInt(b.data.config.attempts, 10) + 1;       // 10 for base 10
        
        var iws = false;
        // Now parse the input:
        if(b.data.correct.answer.match(/#iws/ig) ){                 // Code for Ignore WhiteSpace
          input = input.replace(/\s/g, '');                         // Removes all whitespace from user's input
          b.data.correct.answer = b.data.correct.answer.substring(5); // Removes the command "#iws " from the correct answer.
          iws = true;
        }
        if(b.data.correct.answer.match(/#or/ig) ){                 // Code for Ignore WhiteSpace
          // turn the answer into an array of possible answers
          var old_answer = b.data.correct.answer;
          b.data.correct.answer = b.data.correct.answer.substring(4).split(" "); // .substring(4) removes the command "#or " from the correct answer.
          // Handle correct answer
          for (each = 0; each < b.data.correct.answer.length; each++){
            if ( b.data.correct.answer[each] == input ) {
              return b.handleCorrect();                             // return the point earned from a correct answer.
            }
          }
          // restore answer:
          b.data.correct.answer = old_answer;
        }
        // Handle correct answer
        if ( b.data.input == "none" || b.data.correct.answer == input ) {
          return b.handleCorrect();                                 // return the point earned from a correct answer.
        }
        else if (Array.isArray(b.data.wrong)) {                     // Handle multiple wrong cases
          if(iws){  // need to undo our parsing of the command from the correct answer.
            b.data.correct.answer = "#iws "+b.data.correct.answer;
          }
          for (each = 0; each < b.data.wrong.length; each++){
            if (b.data.wrong[each].answer.match(/#isNaN/g)) {
              if (isNaN(input)) {                                   // Handle not a Number
                return b.handleWrong(b.data.wrong[each]);
              }
            }
            if (b.data.wrong[each].answer.match(/#!isNaN/g)) {
              if (!isNaN(input)) {                                   // Handle not a Number
                return b.handleWrong(b.data.wrong[each]);
              }
            }
            if (b.data.wrong[each].answer == ('#try' + b.data.config.attempts)) {
              return b.handleWrong(b.data.wrong[each]);
            }
            if (b.data.wrong[each].answer == input ||               // Handle 'pure' match
                each == (b.data.wrong.length - 1)) {                // OR last option
              return b.handleWrong(b.data.wrong[each]);
            }
          }
        }
        // This check is deprecated--with maker software, it's always an array. However, might as well keep it. Not gonna be less-robust.
        else {                                                      // Handle single wrong case
          return b.handleWrong(b.data.wrong);
        }
      },

/* === Main DOM Manipulators. === */
      // Uses $.lessonWrite to iterativley write the text in b.data.text.stages to the default div, #whiteboardContent.
      writeStages: function() {
        var i = 0;                                    // Iterator var
        var show_stage = function(){                  // Local function that shows a single stage.
          if(i<b.data.text.stages.length){            // As long as there are still stages to write
            i++;                                      // iterate
            window.setTimeout(function(){
              $.lessonWrite(b.data.text).write(b.data.text.stages[i-1]); // will trigger a 'doneWriting' event on finish to continue the chain.
            }, b.data.text.stage_lens[i-1]);          // Only write the stage after the corresponding wait length has occured
          }
          else {
            $(document).trigger(b.data.config.finish_writing_event_name);// trigger doneStages event, to break the chain of stage-writing.
          }
        }
        
        // Setup continuation handler
        $(document).off('doneWriting');               // clear old handlers
        $(document).on('doneWriting', show_stage);    // Every time $.lessonWrite finishes writing, attempt to write the next stage.
        
        // write the first stage
        show_stage();                                 // This will trigger a 'doneWriting' custom event on completion.
      },
      
      /* Plays the audio file, and shows the audio help message. 
         Up to something else to make sure the help message is hidden/visible appropriatley.
         Depends on lessonAudio & lessonWrite jQuery plugins.*/
      playAudio: function( audio, msg, alertOnFinish, writeStages_flag){
        $(b.data.config.help_container).html('');
        if(writeStages_flag == undefined){
          writeStages_flag = true;
        }

        var $voice = $('#lessonVoice');
        audio = "https://s3-us-west-2.amazonaws.com/zapclass"+audio;

        //unbind previous listeners
        $voice.unbind($.jPlayer.event.loadedata);
        $voice.unbind($.jPlayer.event.error);
        $voice.unbind($.jPlayer.event.volumechange);

        $voice.jPlayer("setMedia", {
          mp3: audio+".mp3",
          oga: audio+".ogg"
        });

        // handle the 'sound don't exist case'
        $voice.bind($.jPlayer.event.error, function(e){
          $voice.unbind($.jPlayer.event.error);
          // the file don't exist on our server.
          if (writeStages_flag){
            b.writeStages();                                      // Must trigger finish_writing_event_name on completion.
          }
          b.displayHelpText(msg);
          if(alertOnFinish){
            setTimeout(function(){
              $.event.trigger({type: "NextBoardPlease"});   // Finally if neither do, it will continue to next board
            }, 4000 - 333);
          }
        });
        // write the stages ot the board at the correct time.
        $voice.bind($.jPlayer.event.loadeddata, function(event){
          if (writeStages_flag){
            b.writeStages();                                      // Must trigger finish_writing_event_name on completion.
          }
          if(event.jPlayer.options.volume == 0 || event.jPlayer.options.muted){
            b.displayHelpText(msg);
          }
        });
        // handle the muting of the sound
        $voice.bind($.jPlayer.event.volumechange, function(e){
          if(e.jPlayer.options.volume == 0 || e.jPlayer.options.muted){
            b.displayHelpText(msg);
          }
        });
        $voice.jPlayer("play");

        if (alertOnFinish){
          $(document).bind($.jPlayer.event.loadeddata, function(){
            $(document).unbind($.jPlayer.event.loadeddata);
            window.setTimeout(function(){
              $.event.trigger({type: "NextBoardPlease"});
            }, ($('#lessonVoice').data('jPlayer').status.duration*1000+300));
          });
        }
     }, 
      // Appends various kinds of input elements to the whiteboard based on b.data.input
      addInput: function(){
        var each;
        if (b.data.input != "none"){        // Check to make sure that this board actually has an input.
          // Handle multiple choice inputs.
          if (Array.isArray(b.data.input)){ // Array implies multiple choice.
            var input_html = "<br><select>";
            for (each = 0; each < b.data.input.length; each++){
              input_html = input_html + "<option value='"+b.data.input[each]+"'>"+b.data.input[each]+"</option>";
            }
            $(b.data.config.main_container).append(input_html+"</select>");
          }
          
          // Handle all other cases.
          else {                            // Assumes b.data.input is a valid <input> "type" value
            var input_html =  "<input type='" + b.data.input +"'>"; // css formatted based on type: input[type=text]
            $(b.data.config.main_container).append(input_html);
          }
          $('input:first').focus();         // we want the input to be auto-selected.
        }
        $('button').removeAttr("disabled"); // enable the control buttons, because we have reached the end of putting things on the whiteboard.
        $.event.trigger({type: "unblock"});
      },
      
/* === Miscellaneous Helpers === */
      getCurrentInput: function(){
        var input = "";
        if (b.data.input != "none") {                   // If set to "none", there should be no input to check, so we won't try.
          // Handle the multiple choice case
          if (Array.isArray(b.data.input)){             // Array implies multiple choice
            input = $('select').val();                  // Just get the val from the select.
          }
          else {
            if (b.data.correct.answer.toLowerCase() == b.data.correct.answer){
              input = $('input').val().toLowerCase();
            }
            else {
              input = parseInt($('input').val());
            }
          }
        }
        return input;
      },
      
      displayHelpText: function(help_location){
        var each;
        $(b.data.config.help_container).html('');
        if (help_location == 'wrong_obj.help') {
          for (each = 0; each < b.data.wrong.length; each++){
            $(b.data.config.help_container).prepend(b.data.wrong[each].help);}
        }
        else {
          $(b.data.config.help_container).prepend(help_location);
        }
      },
      // little abstraction helper
      handleCorrect: function(  ){
        b.playAudio(b.data.correct.audio, b.data.correct.help, true, false);   // play the "You did it" thing, and trigger the global custom event to move to the next board. 

        return b.data.correct.points;                             // return the point earned from a correct answer.
      },

      // similar for wrong answers.
      handleWrong: function( wrong_obj ){
        b.playAudio(wrong_obj.audio, wrong_obj.help, false, false);
        return wrong_obj.points;
      }
    };

    return {
      run:        b.runBoard,
      check:      b.checkInput
    };
  };
})(jQuery);
