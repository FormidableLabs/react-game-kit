import { observable } from 'mobx';

class GameStore {
  @observable characterPosition = { x: 0, y: 0 };

  @observable stageX = 0;

  setCharacterPosition(position) {
    this.characterPosition = position;
  }

  setStageX(x) {
    this.stageX = x;
  }
}

export default new GameStore();
