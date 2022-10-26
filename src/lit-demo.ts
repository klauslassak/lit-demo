import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';


@customElement('lit-demo')

export class LitDemo extends LitElement {
  static styles = css`
    div  {
      font-family: Verdana;
    }
    .div-row {
      display: table-row;
      height:30px;
    }
    .div-cell {
      display: table-cell;
      width: 200px;
    }
    .div-border{
      border:2px solid #c0c0c0c0;
      position: relative;
      display: table-cell;
      width: 400px;
      height:32px;
    }
    .div-value{
      height:30px;
      color:#000;
      background-color:#3527f5;
      width: 2px;
      position: absolute; 
      top: 1px; 
      z-index: 9;

    }
    .div-range{
      border:0px;
      color:#000;
      background-color:#a4ffc4f4; 
      position: relative; 
      margin-top:3px; 
      height:24px;
    }
  `;

  @property({type:String}) test='';
  @property({type:Number}) value=0;
  @property({type:String}) unit='';
  @property({type:Number}) min=0;
  @property({type:Number}) max=0;

  private dispMin=0;
  private dispMax=10000;
  private dispRange=10000;
  private relRight=0;
  private relLeft=0;
  private relVal=0;

  scaleDispRange() {

    const mx = Math.max(this.value, this.max);
    const mn= Math.min(this.value, this.min);

    // add offset to dispaly range
    const offset = (mx-mn)/10; 
    this.dispMax = mx + offset;
    this.dispMin = mn - offset;

    this.dispRange=this.dispMax  - this.dispMin;

    // calcuslate margins for display
    // valuerange
    this.relLeft = (this.min-this.dispMin)/this.dispRange*100;
    this.relRight = (this.dispMax - this.max) /this.dispRange*100;
    //value
    this.relVal = (( this.value - mn) + offset) / this.dispRange*100  ;

  }

  fireEvent() {
    let event = new CustomEvent('out-of-range', {
      detail: {
        message: 'Value ${this.value} ist out of range'
      }
    });
    this.dispatchEvent(event);
  }


  _handleClick(e:any) {
    this.value = Math.round(Math.random() * this.dispMax * 2 );
    if (this.value > this.max || this.value < this.min) {
      this.fireEvent();
      console.log(`Value ${this.value} ist out of range`);
    }
  }

  render() {

    this.scaleDispRange();

    return html`

      <div class="div-row">
        <div class="div-cell">${this.test} </div>
        <div class="div-cell">${this.value} ${this.unit} </div>
        <div class="div-border">
          <div class="div-range" style="margin-left:${this.relLeft}%;margin-right:${this.relRight}%"></div>
          <div class="div-value" style="left:${this.relVal}%"></div>
        </div>
        <div class="dic-cell"><button @click="${this._handleClick}">value</button></div>
      </div>


    `;
  }

}
