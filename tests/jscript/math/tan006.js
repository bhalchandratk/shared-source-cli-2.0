//# ==++== 
//# 
//#   
//#    Copyright (c) 2006 Microsoft Corporation.  All rights reserved.
//#   
//#    The use and distribution terms for this software are contained in the file
//#    named license.txt, which can be found in the root of this distribution.
//#    By using this software in any fashion, you are agreeing to be bound by the
//#    terms of this license.
//#   
//#    You must not remove this notice, or any other, from this software.
//#   
//# 
//# ==--== 
//####################################################################################
@cc_on


import System;

var NULL_DISPATCH = null;
var apGlobalObj;
var apPlatform;
var lFailCount;


var iTestID = 53753;

var inf = 1 / 0;
var nan = 0 / 0;

function p(a)
{
	var res;

	apInitScenario(a);
	with (Math)
	{
		if(!(res = eval(a)))
			apLogFailInfo( "wrong return value",res, "true","");
	}
}

function near(a, b)
{
	var fT = Math.abs(a - b) / (Math.abs(a) + Math.abs(b)) < 1e-15;
	if (fT)
		return 'true';
	return 'false (' + a + ', ' + b + ', ' + (a - b) + ')';
}

function small(a)
{
	var fT = Math.abs(a) < 1e-15;
	if (fT)
		return 'true';
	return 'false (' + a + ')';
}

function big(a)
{
	var fT = Math.abs(1 / a) < 1e-15;
	if (fT)
		return 'true';
	return 'false (' + a + ')';
}

function equal(a, b)
{
	var fT = (a == b) && (1 / a == 1 / b);
	if (fT)
		return 'true';
	return 'false (' + a + ', ' + b + ', ' + (1/a) + ', ' + (1/b) + ')';
}

function tan006()
{
	apInitTest("tan006");

	p("isNaN(tan(nan))");
	p("isNaN(tan(+inf))");
	p("isNaN(tan(-inf))");
	p("small(tan(+PI))");
	p("small(tan(-PI))");
	p("  big(tan(+PI / 2))");
	p("  big(tan(-PI / 2))");
	p("equal(tan(+0), +0)");
	p("equal(tan(-0), -0)");

	apEndTest();
}

tan006();


if(lFailCount >= 0) System.Environment.ExitCode = lFailCount;
else System.Environment.ExitCode = 1;

function apInitTest(stTestName) {
    lFailCount = 0;

    apGlobalObj = new Object();
    apGlobalObj.apGetPlatform = function Funca() { return "Rotor" }
    apGlobalObj.LangHost = function Funcb() { return 1033;}
    apGlobalObj.apGetLangExt = function Funcc(num) { return "EN"; }

    apPlatform = apGlobalObj.apGetPlatform();
    var sVer = "1.0";  //navigator.appVersion.toUpperCase().charAt(navigator.appVersion.toUpperCase().indexOf("MSIE")+5);
    apGlobalObj.apGetHost = function Funcp() { return "Rotor " + sVer; }
    print ("apInitTest: " + stTestName);
}

function apInitScenario(stScenarioName) {print( "\tapInitScenario: " + stScenarioName);}

function apLogFailInfo(stMessage, stExpected, stActual, stBugNum) {
    lFailCount = lFailCount + 1;
    print ("***** FAILED:");
    print ("\t\t" + stMessage);
    print ("\t\tExpected: " + stExpected);
    print ("\t\tActual: " + stActual);
}

function apGetLocale(){ return 1033; }
function apWriteDebug(s) { print("dbg ---> " + s) }
function apEndTest() {}
