angular.module('demo.app.templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('lesson/lesson.html','<div class="container-fluid bg-info">\r\n    <div class="container-fluid">\r\n        <ol class="breadcrumb bg-info">\r\n            <li><a href="#/">Home</a></li>\r\n            <li class="active">{{breadcrumbLesson}}</li>\r\n        </ol>\r\n    </div>\r\n</div>\r\n\r\n<div class="content-main">\r\n    <div class="container-fluid">\r\n        <div class="row">\r\n            <div class="col-md-2 col-sm-2 col">\r\n                <div id="sideNav">\r\n                    <h4>Beginner</h4>\r\n                    <repeat-link list="titleListBeginner"></repeat-link>\r\n                    <hr>\r\n                    <h4>Intermediate</h4>\r\n                    <repeat-link list="titleListIntermediate"></repeat-link>\r\n                    <hr>\r\n                    <h4>Advance</h4>\r\n                    <repeat-link list="titleListAdvance"></repeat-link>\r\n                </div>\r\n            </div>\r\n            <div class="col-md-5 col-sm-5 col">\r\n                <content ng-show="chapter" object="chapter"></content>\r\n                <div ng-hide="chapter">Invalid link</div>\r\n            </div>\r\n            <div class="col-md-5 col-sm-5 col">\r\n                <uib-tabset active="active">\r\n                    <uib-tab index="0" heading="HTML">\r\n                        <textarea class="code-editor" ng-model="htmlCode.text" ng-change="updateHtmlCode(htmlCode.text)" spellcheck="false"></textarea>\r\n                    </uib-tab>\r\n                    <uib-tab index="1" heading="Script">\r\n                        <textarea class="code-editor" ng-model="scriptCode.text" ng-change="updateScriptCode(scriptCode.text)" spellcheck="false"></textarea>\r\n                    </uib-tab>\r\n                    <uib-tab index="2" heading="Style">\r\n                        <textarea class="code-editor" ng-model="styleCode.text" ng-change="updateStyleCode(styleCode.text)" spellcheck="false"></textarea>\r\n                    </uib-tab>\r\n                </uib-tabset>\r\n\r\n                <button class="btn btn-success code-buttons" ng-click="submitCode()">Try It</button>\r\n                <button class="btn btn-warning code-buttons" ng-click="resetCode()">Reset</button>\r\n                <button class="btn btn-info code-buttons" ng-click="showExample()">Example</button>\r\n                <div id="iframeWrapper"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>');
$templateCache.put('main/main.html','<div class="content">\r\n    <div class="container">\r\n        <div class="row">\r\n            <div class="col-md-6 col-md-offset-3">\r\n                <lessons list="lessonList"></lessons>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!--<iframe src="https://docs.google.com/presentation/d/1fpcshynOXj2r63qE8XG3V5WFGgH731X1obSuFn_6KH0/embed?start=false&loop=true&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->');}]);
//# sourceMappingURL=demo.app.templates.js.map
