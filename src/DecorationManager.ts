import { isEqual } from 'lodash';
import * as vscode from "vscode";

export class LineDecoration {
  private line: number;
  private charPositions: number[];
  private decoration: vscode.TextEditorDecorationType;
  private rawConfig: vscode.DecorationRenderOptions;

  constructor(line: number, charIdx: number, dType: vscode.DecorationRenderOptions) {
    this.line = line;
    this.charPositions = [charIdx];
    this.decoration = vscode.window.createTextEditorDecorationType(dType);
    this.rawConfig = dType;
  }

  addPosition(charIdx: number) {
    this.charPositions.push(charIdx);
  }

  getConfig(): vscode.DecorationRenderOptions {
    return this.rawConfig;
  }

  getDecoration(): vscode.TextEditorDecorationType {
    return this.decoration;
  }

  getPositions(): number[] {
    return this.charPositions;
  }

  getRange(): vscode.Range[] {
    const ranges: vscode.Range[] = [];

    for(const position of this.charPositions) {
      const range = new vscode.Range(
        new vscode.Position(this.line, position),
        new vscode.Position(this.line, position + 1)
      );

      ranges.push(range);
    }

    return ranges;
  }
}

export class LineDecorationManager {
  private decoratedLines: Record<number, LineDecoration[]>;

  constructor() {
    this.decoratedLines = {};
  }

  removeChars(_start: number, _end: number, _dType: vscode.DecorationRenderOptions): void {
    // placeholder
  }

  addLineDecoration(line: number, position: number, dType: vscode.DecorationRenderOptions): void {
    const newLineDecoration = new LineDecoration(line, position, dType);

    if(!this.decoratedLines[line]?.length) {
      // No decorations exist yet for this line
      this.decoratedLines[line] = [newLineDecoration];
    } else {
      // Some line decorations already exist for this line
      const dIndex = this.decoratedLines[line]?.findIndex((val: LineDecoration) => isEqual(val.getConfig(), dType));

      if(dIndex === -1) {
        this.decoratedLines[line].push(newLineDecoration);
      } else {
        this.decoratedLines[line][dIndex].addPosition(position);
      }
    }
  }

  getLineDecoration(line: number, dType: vscode.DecorationRenderOptions): LineDecoration | null {
    const dTypeIndex = this.decoratedLines[line]?.findIndex((val: LineDecoration) => isEqual(val.getConfig(), dType));
    if(dTypeIndex === undefined || dTypeIndex === null || dTypeIndex === -1) return null;
    return this.decoratedLines[line][dTypeIndex];
  }

  extractAndRemoveDecoration(line: number, dType: vscode.DecorationRenderOptions): vscode.TextEditorDecorationType | null {
    const dTypeIndex = this.decoratedLines[line]?.findIndex((val: LineDecoration) => isEqual(val.getConfig(), dType));
    if(dTypeIndex === undefined || dTypeIndex === null || dTypeIndex === -1) return null;

    const lineDecoration = this.decoratedLines[line][dTypeIndex];
    delete this.decoratedLines[line][dTypeIndex];

    return lineDecoration.getDecoration();
  }
}
