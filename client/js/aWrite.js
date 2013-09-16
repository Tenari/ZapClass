/*
  The lessonWrite jQuery plugin is useful for writing text to a particular identifier.
  It works best with an id (#included) passed to content_container.
  By constructing a version of this, you get access to .write(string), and the opt object (containg the options)
  Feel free to pass an object in options containing the 'key: value' pairs you desire.
  
  Options Defaults:
    content_container: '#whiteboardContent'
    fade:              true
    fade_duration:     500
    per_letter:        true
    pre_wait:          0       // How long to wait before writing (in ms)
    add:               false   // Add-to-board or clear-then-write
    
  Example Usage:
    var w = $.lessonWrite();
    w.write("Hello, world!");
*/
(function($) {
  $.lessonWrite = function(options) {
    var writer = {
      options: $.extend({
        'content_container':  '#whiteboardContent',
        'fade':               'true',
        'fade_duration':      '500',
        'per_letter':         'true',
        'pre_wait':           '0',
        'add':                'false'                                  // Add-to-board or clear-then-write
      }, options),
      
      writeToBoard: function( string ) {
        window.setTimeout(function(str){
          
          if (writer.options.per_letter == "true") {
            if (writer.options.add != "true") {
              $(writer.options.content_container).text('');            // Clear the content_container
            }
            writer.spanLetters(str);
            writer.showByFade();
          } else {
            if (writer.options.add == "true"){
              writer.addByFade(str);
            } else {
              writer.writeByFade(str);
            }
          }

        }(string), writer.options.pre_wait);
      },
      
      // Appends str to the old .text() either by fading in, or instantly
      addByFade: function(str){
        var oldStr = $(writer.options.content_container).html();
        writer.writeByFade(oldStr+str);
      },
      
      // Writes str over the old .text() either by fading in, or instantly
      writeByFade: function(str){
        if (writer.options.fade == "true") {
          $(writer.options.content_container).fadeOut(writer.options.fade_duration, function(){
            $(writer.options.content_container).html(str);
            $(writer.options.content_container).fadeIn(writer.options.fade_duration, function(){
              $(document).trigger('doneWriting');
            });
          });
        } else {
          $(writer.options.content_container).html(str);
          $(document).trigger('doneWriting');
        }
      },
      
      spanLetters: function(str){
        var toWrite = '';
        for (var i = 0;i<str.length;i++){                       // Iterate over each letter
          if (str.charAt(i) == "<"){                            // primitive html checking
            if(str.charAt(i+1) == "b"){                         // Assume they intend a newline.
              i = i + 3;
              toWrite = toWrite + "<br>";
            }
            else if (str.charAt(i+1) == "s"){                   
              if (str.charAt(i + 2) == "t"){                    // Assume they intend <strong> tag
                i = i + 7;
                toWrite = toWrite + "<strong>";
              }
              else{                                             // Assume they intend <sup> tag
                i = i + 4;
                toWrite = toWrite + "<sup>";
              }
            }
            else if (str.charAt(i+1) == "/"){
              if (str.charAt(i+3) == "t"){                      // Assume the intend </strong> tag
                i = i + 8;
                toWrite = toWrite + "</strong>";
              }
              else {                                            // Assume they intend </sup> tag
                i = i + 5;
                toWrite = toWrite + "</sup>";
              }
            }
          }
          else {
            toWrite = toWrite + '<span style="display:none">'   // Hide all the span-ed characters, so that they can be shown appropriatley
                              + str.charAt(i)+'</span>';        // Create the htmlString to write
          }
        }
        $(writer.options.content_container).append(toWrite);    // Append it to the content_container
      },
      
      // either fades in each inner-span one-by-one, or instantly shows them one-by-one
      showByFade: function(){
        if (writer.options.fade == "true") {
          $(''+writer.options.content_container+' span').each(function(index){
            $(this).delay(writer.options.fade_duration*index).fadeIn(writer.options.fade_duration);
          });
          window.setTimeout(function(){
            $(document).trigger('doneWriting');
          }, (writer.options.fade_duration*($(''+writer.options.content_container+' span').length)));
        } else {
          $(''+writer.options.content_container+' span').each(function(index){
            $(this).delay(writer.options.fade_duration*index).fadeIn(1);
            if(index == ($(''+writer.options.content_container+' span').length-1)){
              $(document).delay(writer.options.fade_duration*index).trigger('doneWriting');
            }
          });
        }
      }
    };

    return {
      write: writer.writeToBoard,
      opt:   writer.options
    };
  };
})(jQuery);
