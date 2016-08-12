/*

  (TypeScript)

  Quick Quiz

*/



/**
*/
interface QuizElement {
  id: number;
  question: string;
  answer: string;
  index: number;
}





/**
*/
class HtmlTreating
{
  /**
  */
  constructor( )
  {
  }


  /**
  */
  addElement( parent:Element, hel:string, html:string )
  {
    let node = document.createElement( hel );
    node.innerHTML = html;
    parent.appendChild( node );
  }
}






/**
*/
class QuickQuiz extends HtmlTreating
{
  QElements: QuizElement[];
  DOM_ID: string;


  /**
  */
  constructor( dom_id: string )
  {
    super();
    this.DOM_ID = dom_id;
    this.QElements = [];
  }


  /**
  */
  collectAllElements( )
  {
    let elms = document.querySelectorAll( "ul." + this.DOM_ID + " li" );
    let c = 1, index = 0;
    for( let eli in elms )
    {
      let el = elms[ eli ];
      if ( el.childElementCount === 2 )
      {
        let Question : string = el.children[ 0 ].innerText;
        let Answer : string = el.children[ 1 ].innerText;
        let QE : QuizElement = { index: index, id: c, question: Question, answer: Answer };
        this.QElements.push( QE );
        el['QQE'] = QE;

        let input_id = "id_" + this.DOM_ID + "_" + c;
        let input_class = this.DOM_ID + "_inputclass";
        let txt1 = "<input id='v_" + input_id + "' value='' type='text' placeholder='Your answer' />";
        txt1 += "<div id='d_" + input_id + "' title='Get answer'>Help</div>";
        this.addElement( el, "div", txt1 );

        let txt2 = "<span class='element-number'>" + c + "</span>";
        this.addElement( el, "span", txt2 );

        el.addEventListener( "keyup", this.verifyFields, false );
        el.addEventListener( "change", this.verifyFields, false );
        el.addEventListener( "dblclick", this.setAnswer, false );

        let inputfield = document.getElementById( "v_" + input_id );
        let knopka = document.getElementById( "d_" + input_id );
        knopka[ 'elementus' ] = el;
        knopka[ 'inputfield' ] = inputfield;
        knopka.addEventListener( "click", this.setAnswer2, false );

        c++;
      }
      index++;
    }
  }


  /**
  */
  verifyFields( e )
  {
    if ( e.target.value.toLowerCase() === e.target.parentNode.parentNode.QQE.answer.toLowerCase() )
      e.target.className = "input_class green";
    else
      e.target.className = "input_class red";

    if ( e.target.value.toLowerCase() === "" )
      e.target.className = "input_class";
  }


  /**
  */
  setAnswer( e )
  {
    let elementus = e.target.parentNode.parentNode;
    let inputfield = e.target;
    inputfield.value = elementus.QQE.answer;;
    inputfield.className = "input_class green";
  }


  /**
  */
  setAnswer2( e )
  {
    let elementus = e.target[ 'elementus' ];
    let inputfield = e.target[ 'inputfield' ];
    inputfield.value = elementus.QQE.answer;
    inputfield.className = "input_class green";
  }

}





document[ 'Symbol_for_my_quick_quiz' ] = (<any>Object).assign({},{onreadystatechange:document.onreadystatechange});
document.onreadystatechange=function(){if(document.readyState==="interactive"){
  
  if ( document[ 'Symbol_for_my_quick_quiz' ].onreadystatechange )
    document[ 'Symbol_for_my_quick_quiz' ].onreadystatechange();

  var qq = new QuickQuiz( "my-quick-quiz" );
  qq.collectAllElements( );

}};