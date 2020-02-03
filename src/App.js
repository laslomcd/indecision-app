import React from 'react';

import Header from './components/Header/Header.component';
import Action from './components/Action/Action.component';
import Options from './components/Options/Options.component';
import AddOption from './components/AddOption/AddOption.component';
import OptionModal from './components/OptionModal/OptionModal.component';

import './App.scss';

class App extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    }

    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => ({ selectedOption: option }))
    };

    handleDeleteOption = (optionToRemove) => {
        this.setState(prevState => ({
            options: prevState.options.filter(option => optionToRemove !== option)
        }));
    };

    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
    };

    handleAddOption = (option) => {
        if (!option) {
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }

        this.setState(prevState => ({
            options: prevState.options.concat(option)
        }));
    };

    handleClearSelectedOption = () => {
        this.setState(() => ({
            selectedOption: undefined
        }))
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if (options) {
                this.setState(() => ({ options }));
            }
        } catch (e) {
            // Do Nothing
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }



    render() {
        const subtitle = 'Put your life in the hands of a computer.';
        return (
            <div className="App">
                <Header subtitle={subtitle} />
                <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick} />
                <Options options={this.state.options} handleDeleteOption={this.handleDeleteOption} handleDeleteOptions={this.handleDeleteOptions} />
                <AddOption handleAddOption={this.handleAddOption} />
                <OptionModal selectedOption={this.state.selectedOption} handleClearSelectedOption={this.handleClearSelectedOption} />
            </div>
        );
    }

}

export default App;
