import React, { Component } from 'react';
import './App.css';
import api from './api';
import capa from './images/capa.jpg';
import polaroid from './images/polaroid.png';
import oldpaper from './images/oldpaper.jpg';
import PerfectScrollbar from 'react-perfect-scrollbar'

class App extends Component {
  state = {
    charData: [],
    epData: [],
    selected: {},
    selectedEp: []
  }

  async componentDidMount() {
    const responseChar = await api.get('characters?category=Breaking+Bad');
    const responseEp = await api.get('episodes?category=Breaking+Bad');
    this.setState({ charData: responseChar.data });
    this.setState({ epData: responseEp.data });
    const selectedConst = { name: this.state.charData[0].name, nickname: this.state.charData[0].nickname, birthday: this.state.charData[0].birthday, status: this.state.charData[0].status, url: this.state.charData[0].img };
    this.setState({
      selected: selectedConst
    })
    this.setEpisodes(selectedConst);
  }

  

  render() {
    return(
      <div>
        <div className="custom-dropdown">
          <select onChange={this.selectCharacter}>{this.state.charData.map((character, i) => 
            <option key={i} value={i}>{character.name}</option>
          )}
          </select>
        </div> 
        <div className="card">
          <div className="imgBox">
            <img className="imgCapa" src={capa}/>
          </div>
          <div className="detalhes">
            <img className="imgOldpaper" src={oldpaper}/>
            <div className='row1'>
              <div>
                <img className="imgPolaroid" src={polaroid}/>
                <img className="imgData" src={this.state.selected.url}/>
              </div>
              <div>
                <div className="nameBox">
                  <div className="desc">
                    Name:
                  </div>
                  <div className="info">
                    {this.state.selected.name}
                  </div>
                </div>
                <div className="nicknameBox">
                  <div className="desc">
                    Nickname:
                  </div>
                  <div className="info">
                  {this.state.selected.nickname}
                  </div>
                </div>
                <div className="birthdayBox">
                  <div className="desc">
                    Birthday:
                  </div>
                  <div className="info">
                  {this.state.selected.birthday}
                  </div>
                </div>
              </div>
            </div>
            <div className="statusBox">
              <div className="desc">
                Status:
              </div>
              <div className="info">
              {this.state.selected.status}
              </div>
            </div>
            <div className="episodesBox">
              <div className="desc">
                Episodes:
              </div>
              <PerfectScrollbar className="info">
               <ul>
               {this.state.selectedEp.map((ep, i) => 
                <li key={i}>{ep}</li>
                  )}
               </ul>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
      </div>
    )
  }
  selectCharacter = (data) => {
    const i = data.target.value;
    const selectedConst = { name: this.state.charData[i].name, nickname: this.state.charData[i].nickname, birthday: this.state.charData[i].birthday, status: this.state.charData[i].status, url: this.state.charData[i].img };
    this.setState({
      selected: selectedConst
    });
    this.setEpisodes(selectedConst);
  }

  setEpisodes = (selectedChar) => {
    const epArray = [];
    this.state.epData.forEach((ep) => {
      ep.characters.forEach((character) => {
        if (character === selectedChar.name) {
          epArray.push(`Episode ${ep.episode} - Season ${ep.season}`);
        }
      })
    })
    this.setState({selectedEp: epArray});
  }
}

export default App;
