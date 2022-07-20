import React, { Component } from "react";
import { connect } from 'react-redux';

class SkillForm extends Component {

  constructor(){
    super();
    this.state = {
      name: ''
    }
  }

  componentDidMount(){
    this.setState({name: this.props.skill.name})
  }

  componentDidUpdate(prevProps){
    if(!prevProps.skill.id && this.props.skill.id){
      this.setState({name: this.props.skill.name})
    }
  }

  render() {
    const {name} = this.state;
    return (
      <div>
        <h2>Edit Skill</h2>
        <form>
          <input value={ name } onChange={ev => this.setState({name: ev.target.value})}/>
          <button disabled={!name}>Save</button>
          <button>Cancel</button>
        </form>
      </div>
    );
  }
}

const mapState = (state, {match}) =>{
  const id = match.params.id*1;
  const skill = state.skills.find(skill => skill.id === id) || {name: ''};

  return {
    skill
  }
}

export default connect(mapState)(SkillForm);
