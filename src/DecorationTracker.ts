import { isEqual } from 'lodash';
import * as vscode from "vscode";

interface RemovedRange {
  start: number;
  end: number;
}

class LineDecoration {
  public charIndices: number[];
  public decoration: vscode.TextEditorDecorationType;
  public rawConfig: vscode.DecorationRenderOptions;

  constructor(charIdx: number, dType: vscode.DecorationRenderOptions) {
    this.charIndices = [charIdx];
    this.decoration = vscode.window.createTextEditorDecorationType(dType);
    this.rawConfig = dType;
  }

  add(charIdx: number) {
    this.charIndices.push(charIdx);
  }
}

export class DecorationTracker {
  public decoratedLines: Record<number, LineDecoration[]>;

  constructor() {
    this.decoratedLines = {};
  }

  removeChars(removed: RemovedRange, dType: vscode.DecorationRenderOptions): void {
    // placeholder
  }

  addChar(line: number, position: number, dType: vscode.DecorationRenderOptions): void {
    const newLineDecoration = new LineDecoration(position, dType);

    if(this.decoratedLines[line]?.length) {
      // No decorations exist yet for this line
      this.decoratedLines[line] = [newLineDecoration];
    } else {
      // Some line decorations already exist for this line
      const dIndex = this.decoratedLines[line].findIndex((val: LineDecoration) => isEqual(val.rawConfig, dType));

      if(dIndex === -1) {
        this.decoratedLines[line].push(newLineDecoration);
      } else {
        this.decoratedLines[line][dIndex].add(position);
      }
    }
  }

  getDecoration(line: number, dType: vscode.DecorationRenderOptions): [vscode.Range[], vscode.TextEditorDecorationType] {
    // convert positions into ranges and convert dtype

    // const dTypeIndex = this.decoratedLines[line].findIndex((val: LineDecoration) => isEqual(val.rawConfig, dType));
    // const lineDecoration = this.decoratedLines[line][dTypeIndex];
    // return [lineDecoration.charIndices, lineDecoration.decoration];
  }

  extractAndRemoveDecoration(line: number, dType: vscode.DecorationRenderOptions): vscode.TextEditorDecorationType | null {
    // same as above but also remove

    // const dTypeIndex = this.decoratedLines[line]?.findIndex((val: LineDecoration) => isEqual(val.rawConfig, dType));

    // if(!dTypeIndex || dTypeIndex === -1) {
    //   return null;
    // } else {
    //   const { decoration } = this.decoratedLines[line][dTypeIndex];
    //   delete this.decoratedLines[line][dTypeIndex];
    //   return decoration;
    // }
  }
}

// {
//   1: {
//     range: [],
//     dType:
//   }
// }