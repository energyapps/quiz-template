#import jsons
import json
from random import shuffle

headerjson = open('assets/header.json')
header = json.load(headerjson)
header2 = header[0]
footerjson = open('assets/footer.json')
footer = json.load(footerjson)
datajson = open('assets/data.json')
data = json.load(datajson)

size = [30,65,95,125];

#Load title info
headercontent = '<div class="large-12 columnsDOE headline"><center><h2>' + header2['title'] + '</h2></center></div><div class="large-12 columnsDOE header-color"><h3>' + header2['subtitle'] + '</h3></div>'

#Load footer info
footercontent = ""
for i in range(0, len(footer)):
	z = '<div class="large-12 columnsDOE header-color result-text" endpoint="' + footer[i]['endrange'] + '" id="a' + str(i + 1) + '"><h3>' + footer[i]['scoretext'] + '</h3></div>'         
	footercontent = footercontent + z

#Load questions
questions = ""

for i in range(0, len(data)):

	# print len(data[i]['ans1'])
	g = [[data[i]['ans1'],'correct',len(data[i]['ans1'])],
	[data[i]['ans2'],'',len(data[i]['ans2'])],
	[data[i]['ans3'],'',len(data[i]['ans3'])],
	[data[i]['ans4'],'',len(data[i]['ans4'])]]

	shuffle(g)

	#Add in classes to define the heights of the questions, one to its random neighbor.
	if (g[0][2] > size[3]) or (g[1][2] > size[3]):
		hgtclass1 = "xxlarge-a"
	elif (g[0][2] > size[2]) or (g[1][2] > size[2]):
		hgtclass1 = "xlarge-a"
	elif (g[0][2] > size[1]) or (g[1][2] > size[1]):
		hgtclass1 = "large-a"
	elif (g[0][2] > size[0]) or (g[1][2] > size[0]):
		hgtclass1 = "medium-a"
	else:
		hgtclass1 = "small-a"

	if (g[2][2] > size[3]) or (g[3][2] > size[3]):
		hgtclass2 = "xxlarge-a"
	elif (g[2][2] > size[2]) or (g[3][2] > size[2]):
		hgtclass2 = "xlarge-a"
	elif (g[2][2] > size[1]) or (g[3][2] > size[1]):
		hgtclass2 = "large-a"
	elif (g[2][2] > size[0]) or (g[3][2] > size[0]):
		hgtclass2 = "medium-a"
	else:
		hgtclass2 = "small-a"		

	# // set content to have answers in them    
    #  // header image conditional
	if data[i]['img'] == "":
		headImg = ""
	else:
		headImg = '<img src="' + data[i]['img'] + '">'    

	# context info conditional
	if data[i]['cont'] == "":	
		contInfo = ""
	else:
		contInfo = '<div id="c' + str(i) + \
		'" class="rowDOE context-container"><div class="context-info"><p>' + \
		data[i]['cont'] + '</p></div></div>'
	
	# print contInfo

	content2 = '<div data-id="' + str(i) + '" id="question' + str(i+1) + '" class="question-individual"><div class="question subheadline"><p>' +  \
	str(i + 1) + \
	'. ' + \
	data[i]['question'] + \
	'</p></div><div class="rowDOE full-size-blocks"><div class="large-12 columnsDOE map-image">' + \
	headImg + \
	'</div></div><div class="answers"><div class="large-12 columnsDOE halves"><div class="medium-6 small-12 columnsDOE a-options first-c"><div class="large-12 medium-12 small-12 small-centered a-bg ' + hgtclass1 + ' q' + str(i+1) + ' ' + g[0][1] + '" data-id=' + str(i) + '><p>' + \
	g[0][0] +  \
	'</p></div></div><div class="medium-6 small-12 columnsDOE a-options"><div class="large-12 medium-12 small-12 small-centered a-bg ' + hgtclass1 + ' q' + str(i+1) + ' ' + g[1][1] + '" data-id=' + str(i) + '><p>' + \
	g[1][0] + \
	'</p></div></div></div><div class="large-12 columnsDOE halves"><div class="medium-6 small-12 columnsDOE a-options"><div class="large-12 medium-12 small-12 small-centered a-bg ' + hgtclass2 + ' q' + str(i+1) + ' ' + g[2][1] + '" data-id=' + str(i) + '><p>' + \
	g[2][0] + \
	'</p></div></div><div class="medium-6 small-12 columnsDOE a-options last-c"><div class="large-12 medium-12 small-12 small-centered a-bg ' + hgtclass2 + ' q' + str(i+1) + ' ' + g[3][1] + '" data-id=' + str(i) + '><p>' + \
	g[3][0] + \
	'</p></div></div></div></div>' + contInfo + '<div class="rowDOE"><div class="large-12 tweener"></div></div></div>'

	questions = questions + content2
	# print questions

# print questions

# Open a file
fo = open("assets/quiz/markdown.html", "wb")
# print "Name of the file: ", fo.name

# port over strings that are constant (frames), store as in python script here?
# 

s1 = '<div id="master_container" class="m_container"><div class="rowDOE" id="header-container">'
##header Added here
s2 = '</div><div id="questions-container">'
##Questions added here
s3 = '</div><div class="rowDOE"><div class="score"><p>Your Score:</p></div></div><div class="rowDOE"><div  class="small-6 medium-4 large-3 small-centered columnsDOE" id="results"></div></div><div class="rowDOE"><div class="rowDOE" id="footer-container">'
##Footer info
s4 = '</div><div class="rowDOE"><div><div class="small-centered columnsDOE active" id="social-buttons"><h3>Share your score!</h3><div id="facebook-quiz" class="social-button"><a href="energy.gov"><img src="img/facebook.png"></a></div><div id="twitter-quiz" class="social-button"><a href=""><img src="img/twitter.png"></a></div></div></div></div></div></div>'

fo.write(s1)
fo.write(headercontent)
fo.write(s2)
fo.write(questions)
fo.write(s3)
fo.write(footercontent)
fo.write(s4)


# Close opend file
fo.close()