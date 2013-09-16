﻿Meteor.lessons.algebra.invest =
[{"text":{"stages":["<span class='wordProblem'>I deposit $5,000 in an account that earns me 5% interest each year. How much money do I have at the end of the first year?</span>","<br>deposit + percent(deposit) = new amount","<br>new amount = "],"stage_lens":["0","1000","1000"],"content_container":"#whiteboardContent","fade":"false","fade_duration":"500","per_letter":"false","add":"true"},"input":"text","help":"I deposit $5,000 in an account that earns me 5% interest each year. How much money do I have at the end of the first year? The formula for this is deposit + percent(deposit) = new amount. So, write out the expression for the new amount.","audio":"/sounds/a_invest_B0_1","correct":{"answer":"#iws #or $5000+0.05($5000) 5000+0.05(5000) $5,000+0.05($5,000) 5000+5%(5000) 5000+5%*5000","points":"1","audio":"/sounds/a_invest_B0_2","help":"Correct! Just plug in."},"wrong":[{"answer":"#try1","points":"-1","audio":"/sounds/a_invest_B0_3","help":"The deposit is $5000"},{"answer":"#try2","points":"-1","audio":"/sounds/a_invest_B0_4","help":"The percent is 0.05 (because 5% = 0.05)"},{"answer":"#try3","points":"-1","audio":"/sounds/a_invest_B0_5","help":"It is 5000 + 0.05(5000)"}]},{"text":{"stages":["<span class='wordProblem'>I deposit $5,000 in an account that earns me 5% interest each year. How much money do I have at the end of the first year?</span><br>new amount = $5000 + 0.05($5000)","<br>new amount = $"],"stage_lens":["0","1000"],"content_container":"#whiteboardContent","fade":"false","fade_duration":"500","per_letter":"false","add":"true"},"input":"number","help":"Simplify the new amount","audio":"/sounds/a_invest_B1_1","correct":{"answer":"5250","points":"1","audio":"/sounds/a_invest_B1_2","help":"Correct! $5000 initially + $250 earned"},"wrong":[{"answer":"#try1","points":"-1","audio":"/sounds/a_invest_B1_3","help":"The earnings is $250. Add that to the initial deposit"},{"answer":"","points":"-1","audio":"/sounds/a_invest_B1_4","help":"It is 5250"}]},{"text":{"stages":["<span class='wordProblem'>I split $5,000 between two accounts earning 5% and 7%. If the total profit was $270, how much was in each account?</span>"],"stage_lens":["1000"],"content_container":"#whiteboardContent","fade":"true","fade_duration":"500","per_letter":"false","add":"false"},"input":["$5000 / (5% + 7%)","let x be the money earned from one account","let x be the total earnings","let x be the total money deposited","let x be the money in one account"],"help":"That kind of problem is fairly simple, but it can get harder when there is more than one interest rate. I split $5,000 between two accounts earning 5% and 7%. If the total profit was $270, how much was in each account? What should we do to solve this?","audio":"/sounds/a_invest_B2_1","correct":{"answer":"let x be the money in one account","points":"2","audio":"/sounds/a_invest_B2_2","help":"Correct! We are trying to find the money in each account."},"wrong":[{"answer":"$5000 / (5% + 7%)","points":"-1","audio":"/sounds/a_invest_B2_3","help":"I don't know how that would help"},{"answer":"let x be the money earned from one account","points":"-1","audio":"/sounds/a_invest_B2_4","help":"We are trying to find the amount of money initially in each account, not the earnings"},{"answer":"let x be the total earnings","points":"-1","audio":"/sounds/a_invest_B2_5","help":"We already know the total earnings. $270"},{"answer":"let x be the total money deposited","points":"-1","audio":"/sounds/a_invest_B2_6","help":"We already know that. It's $5000"}]},{"text":{"stages":["<span class='wordProblem'>I split $5,000 between two accounts earning 5% and 7%. If the total profit was $270, how much was in each account?</span><br>x = money in 5% account","<br>money in 7% account = "],"stage_lens":["0","1000"],"content_container":"#whiteboardContent","fade":"false","fade_duration":"500","per_letter":"false","add":"true"},"input":"text","help":"Now write the amount of money in the 7% account, in terms of x.","audio":"/sounds/a_invest_B3_1","correct":{"answer":"#iws #or 5000-x (5000-x) $5000-x ($5000-x)","points":"2","audio":"/sounds/a_invest_B3_2","help":"Ther money in the 7% account is the total minus the money in the other account."},"wrong":[{"answer":"#try1","points":"-1","audio":"/sounds/a_invest_B3_3","help":"There are $5000 total"},{"answer":"#try2","points":"-1","audio":"/sounds/a_invest_B3_4","help":"There are x dollars in the 5% account"},{"answer":"#try3","points":"-1","audio":"/sounds/a_invest_B3_5","help":"Which means that there are $5000 - x in the 7% account"}]},{"text":{"stages":["<span class='wordProblem'>I split $5,000 between two accounts earning 5% and 7%. If the total profit was $270, how much was in each account?</span><br>x = money in 5%, worth _____<br>5000 - x = money in 7%"],"stage_lens":["0"],"content_container":"#whiteboardContent","fade":"true","fade_duration":"500","per_letter":"false","add":"false"},"input":"text","help":"Now, how much does the money in the 5% account earn, in terms of x?","audio":"/sounds/a_invest_B4_1","correct":{"answer":"#iws #or 5%x 0.05x 5%(x) 0.05(x)","points":"2","audio":"/sounds/a_invest_B4_2","help":"Because x dollars at 5% is 0.05x"},"wrong":[{"answer":"","points":"-1","audio":"/sounds/a_invest_B4_3","help":"It earns 0.05x"}]},{"text":{"stages":["<span class='wordProblem'>I split $5,000 between two accounts earning 5% and 7%. If the total profit was $270, how much was in each account?</span><br>x = money in 5%, earns 0.05x<br>(5000 - x) = money in 7%, earns ______"],"stage_lens":["0"],"content_container":"#whiteboardContent","fade":"true","fade_duration":"500","per_letter":"false","add":"false"},"input":"text","help":"Now what does the money in the 7% account earn, in terms of x?","audio":"/sounds/a_invest_B5_1","correct":{"answer":"#iws #or 0.07(5000-x) 7%($5000-x) 0.07($5000-x) 7%(5000-x) .07($5000-x) .07(5000-x)","points":"2","audio":"/sounds/a_invest_B5_2","help":"Correct!"},"wrong":[{"answer":"#try1","points":"-1","audio":"/sounds/a_invest_B5_3","help":"It earns 7% times the amount of money"},{"answer":"#try2","points":"-1","audio":"/sounds/a_invest_B5_4","help":"It earns 0.07(5000-x)"}]},{"text":{"stages":["<span class='wordProblem'>I split $5,000 between two accounts earning 5% and 7%. If the total profit was $270, how much was in each account?</span><br>x = money in 5%, earns 0.05x<br>(5000 - x) = money in 7%, earns 0.07(5000 - x)"],"stage_lens":["0"],"content_container":"#whiteboardContent","fade":"true","fade_duration":"500","per_letter":"false","add":"false"},"input":"text","help":"Now that we have the earnings on each account, in terms of x, we can write the equation that will let us solve for x.","audio":"/sounds/a_invest_B6_1","correct":{"answer":"#iws #or 0.05x+0.07(5000-x)=270 0.05x+0.07($5000-x)=$270 .05x+.07(5000-x)=270 .05x+.07($5000-x)=$270 0.07(5000-x)+0.05x=270 0.07($5000-x)+0.05x=$270 .07(5000-x)+.05x=270 .07($5000-x)+.05x=$270 5%x+7%(5000-x)=270 5%x+7%($5000-x)=$270 7%(5000-x)+5%x=270 7%($5000-x)+5%x=$270","points":"3","audio":"/sounds/a_invest_B6_2","help":"The sum of earnings from each account equals the total earnings"},"wrong":[{"answer":"#try1","points":"-1","audio":"/sounds/a_invest_B6_3","help":"The equation is the sum of the earnings of the two accounts equal to the total earnings"},{"answer":"#try2","points":"-1","audio":"/sounds/a_invest_B6_4","help":"5% earnings + 7% earnings = total earnings"},{"answer":"#try3","points":"-1","audio":"/sounds/a_invest_B6_5","help":"0.05x + 7% earnings = total earnings"},{"answer":"#try4","points":"-1","audio":"/sounds/a_invest_B6_6","help":"0.05x + 0.07(5000 - x) = total earnings"},{"answer":"#try5","points":"-1","audio":"/sounds/a_invest_B6_7","help":"0.05x + 0.07(5000 - x) = 270"}]},{"text":{"stages":["<span class='wordProblem'>I split $5,000 between two accounts earning 5% and 7%. If the total profit was $270, how much was in each account?</span><br>0.05x + 0.07(5000 - x) = 270","<br>x = $"],"stage_lens":["0","1000"],"content_container":"#whiteboardContent","fade":"false","fade_duration":"500","per_letter":"false","add":"true"},"input":"number","help":"Now solve for x, and you'll have the amount of money put into the 5% account","audio":"/sounds/a_invest_B7_1","correct":{"answer":"4000","points":"1","audio":"/sounds/a_invest_B7_2","help":"Correct! Simple equation solving."},"wrong":[{"answer":"#try1","points":"-1","audio":"/sounds/a_invest_B7_3","help":"distribute the 0.07: 0.05x + 350 - 0.07x = 270"},{"answer":"#try2","points":"-1","audio":"/sounds/a_invest_B7_4","help":"combine the x's: -0.02x + 350 = 270"},{"answer":"#try3","points":"-1","audio":"/sounds/a_invest_B7_5","help":"subtract 350: -0.02x = -80"},{"answer":"#try4","points":"-1","audio":"/sounds/a_invest_B7_6","help":"divide by -0.02: x = 4000"}]},{"text":{"stages":["<span class='wordProblem'>I split $5,000 between two accounts earning 5% and 7%. If the total profit was $270, how much was in each account?</span><br>$4000 in the 5% account","<br>and how much in the 7% account? "],"stage_lens":["0","1000"],"content_container":"#whiteboardContent","fade":"false","fade_duration":"500","per_letter":"false","add":"true"},"input":"number","help":"If we know that there were $4000 in the 5% account, then how much were in the 7% account?","audio":"/sounds/a_invest_B8_1","correct":{"answer":"1000","points":"1","audio":"/sounds/a_invest_B8_2","help":"You know know how to deal with investment problems."},"wrong":[{"answer":"","points":"-1","audio":"/sounds/a_invest_B8_3","help":"5000 - 4000 = 1000"}]}]
;