import React from "react";
import { createClientSkill, deleteClientSkill} from './store';
import { connect } from "react-redux";

class SkillChooser extends React.Component {
  constructor() {
    super();
    this.state = {
      skillId: "",
    };
    this.save = this.save.bind(this);
  }

  save(ev) {
    ev.preventDefault();
    this.props.create(this.state.skillId);
  }

  

  render() {
    const { skills } = this.props;
    const { skillId } = this.state;
    const { save } = this;
    return (
      <form onSubmit={save}>
        <select
          value={skillId}
          onChange={(ev) => this.setState({ skillId: ev.target.value })}
        >
          <option value="">-- Chose a Skill --</option>
          {skills.map((skill) => {
            return (
              <option key={skill.id} value={skill.id}>
                {skill.name}
              </option>
            );
          })}
        </select>
        <button disabled={!skillId}>Add Skill</button>
      </form>
    );
  }
}

const Client = ({ client, clientSkills, skills, lackingSkills, createClientSkill, deleteClientSkill }) => {
  return (
    <div>
      <h2>{client.name}</h2>
      <ul>
        {clientSkills.map((clientSkill) => {
          const skill = skills.find(
            (skill) => skill.id === clientSkill.skillId
          );
          return (
            <li key={clientSkill.id}>
              {skill.name}
              <button onClick={() => deleteClientSkill(clientSkill)}>x</button>
            </li>
          );
        })}
      </ul>
      <SkillChooser skills={lackingSkills} create={(skillId) => createClientSkill(skillId)}/>
    </div>
  );
};

const mapState = (state, { match }) => {
  const id = match.params.id * 1;
  const client = state.clients.find((client) => client.id === id) || {};
  const clientSkills =
    state.clientSkills.filter(
      (clientSkill) => clientSkill.clientId === client.id
    ) || {};
  const lackingSkills = state.skills.filter(
    (skill) =>
      !clientSkills.find((clientSkill) => clientSkill.skillId === skill.id)
  );
  return {
    client,
    clientSkills,
    skills: state.skills,
    lackingSkills,
  };
};

const mapDispatch = (dispatch, {match}) =>{
    const clientId = match.params.id *1;
    return {
        createClientSkill: (skillId) => dispatch(createClientSkill({clientId, skillId: skillId * 1})),
        deleteClientSkill: (clientSkill) => dispatch(deleteClientSkill(clientSkill))
    }
}

export default connect(mapState, mapDispatch)(Client);
