/* TODO: change the class name to your xblock. This is Javascript for the MCQ Random Template XBlock. */
function MCQRandomTemplateXBlock(runtime, element) {

var handlerUrl = runtime.handlerUrl(element, 'getNewQuestion');
var flag = "false";
var answers = {{answers|safe}};
var solutionIndex = {{solution_index}};
var possibleAnswers = {{numberOfPossibleAnswers}};

//Gets executed once per question
function updateQuestion(result) {
        answers = result.answers;
        possibleAnswers = result.answers.length
        solutionIndex = result.solution_index;
        var answerString = "";
        var j = 0;
        var prev_j = [];
        var temp_j = 0;
        for (var i = 0; i < possibleAnswers; i ++)
        {      
            temp_j = getRandomInt(0, possibleAnswers);
            while(prev_j.indexOf(temp_j) != -1)
            {
                temp_j = getRandomInt(0, possibleAnswers);
            }
            prev_j.push(temp_j);
            if (temp_j == solutionIndex)
            {
                answerString += "<input type='radio' id='sol' name='answerChoice' value='" + i.toString() + "'>" + answers[temp_j] + "<br>";
            }
            else
            {
                answerString += "<input type='radio' name='answerChoice' value='" + i.toString() + "'>" + answers[temp_j] + "<br>";
            }
        }
        $('#answerChoices').html(answerString);


        flag = "false";
        $('#question').text(result.question_title);
        $('.score', element).text(result.score);
    }

    //Checks to see if the question was answered correctly. Will fetch a new question upon correct answer
    function checkQuestion() {

        var selected = $("#sol:checked");

        //Was answer right?
        if (selected.val())
        {
            //Need to Have two button-process for correct answer choice
                $.ajax({
                type: "POST",
                url: handlerUrl,
                data: JSON.stringify({"question": "correct", "flag": flag}),
                success: updateQuestion
            });
        }
        else
        {
            flag = "true";
            // style for the shaking button
            alert('incorrect answer');
        }
    }

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

    //Gets executed once upon first question load
    $(function() {
        var answerString = "";
        var j = 0;
        var prev_j = [];
        var temp_j = 0;
        for (var i = 0; i < possibleAnswers; i ++)
        {      
            temp_j = getRandomInt(0, possibleAnswers);
            while(prev_j.indexOf(temp_j) != -1)
            {
                temp_j = getRandomInt(0, possibleAnswers);
            }
            prev_j.push(temp_j);
            if (temp_j == solutionIndex)
            {
                answerString += "<input type='radio' id='sol' name='answerChoice' value='" + i.toString() + "'>" + answers[temp_j] + "<br>";
            }
            else
            {
                answerString += "<input type='radio' name='answerChoice' value='" + i.toString() + "'>" + answers[temp_j] + "<br>";
            }
        }
        $('#answerChoices').html(answerString);
        $('button', element).click(function(eventObject) {
            checkQuestion();
        });
    });

}
