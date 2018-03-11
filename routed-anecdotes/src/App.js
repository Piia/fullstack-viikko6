import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { Container, Table, Form, Button, Message, Menu, Grid, Image, Header, Segment } from 'semantic-ui-react'

const MenuComp = (props) => (
  <Router>
    <div>
      <Menu inverted> 
        <Menu.Item link>   
          <Link to='/anecdotes'>anecdotes</Link>
        </Menu.Item>
        <Menu.Item link>
          <Link to='/create'>create new</Link>
        </Menu.Item>
        <Menu.Item link>
          <Link to='/'>about</Link>
        </Menu.Item>
      </Menu>
      <Route exact path='/anecdotes/:id' render={({match}) =>
        <Anecdote anecdote={props.anecdotes.find(a => a.id === match.params.id)} vote={props.vote} /> } />
      <Route exact path="/anecdotes" render={() => 
        <AnecdoteList anecdotes={props.anecdotes} />} />
      <Route exact path="/create" render={() => 
        props.notification === ''
          ? <CreateNew addNew={props.addNew} setNotification={props.setNotification} />
          : <Redirect to="/anecdotes" />} />
      <Route exact path="/" render={() => <About />} />
    </div>
  </Router>
)

const Anecdote = ({ anecdote, vote }) => (
  <div>
    <Header as='h2'>{anecdote.content} by {anecdote.author}</Header>
    <Segment circular>
        <Header as='h2'>
            Votes: {anecdote.votes}
        </Header>
        <Button onClick={vote} id={anecdote.id}>VOTE</Button>
    </Segment>
    <Segment.Group>
      <Segment>Content: {anecdote.content}</Segment>
      <Segment>Author: {anecdote.author}</Segment>
      <Segment>Info: <a href={anecdote.info}>{anecdote.info}</a></Segment>
    </Segment.Group>
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <Header as='h2'>Anecdotes</Header>
    <Table striped celled>
      <Table.Body>
      {anecdotes.map(anecdote => 
        <Table.Row key={anecdote.id}>
            <Table.Cell>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </Table.Cell>
            <Table.Cell>
              {anecdote.author}
            </Table.Cell>
          </Table.Row> 
      )}
      </Table.Body>
    </Table> 
  </div>
)

const About = () => (
  <div>
    <Header as='h2'>About anecdote app</Header>
    <Grid columns={2} divided>
      <Grid.Column>
        <p>According to Wikipedia:</p>
    
        <em>An anecdote is a brief, revealing account of an individual person or an incident. 
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
          An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </Grid.Column>
      <Grid.Column>
        <Image src="https://cdn.shopify.com/s/files/1/0171/0430/products/margaret_hamilton.png" alt="Margaret Hamilton" />
      </Grid.Column>
    </Grid>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

const Notification = ({ notification }) => (
  notification !== '' &&
    <Message success>
      {notification}
    </Message>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.setNotification(`New anecdote ${this.state.content} created!`)
  }

  render() {
    return(
      <div>
        <Header as='h2'>Create new anecdote</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>content</label>
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>author</label>
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>url for more info</label>
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </Form.Field> 
          <Button>create</Button>
        </Form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  setNotification = (notification) => {
    this.setState({ notification })
    setTimeout(() => this.setState({ notification: '' }), 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (event) => {
    const id = event.target.id
    const anecdote = this.anecdoteById(id)
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)
    this.setState({ anecdotes })
  }

  render() {
    return (
      <Container>
        <Header as='h1'>Software anecdotes</Header>
          <Notification notification={this.state.notification} />
          <MenuComp anecdotes={this.state.anecdotes} 
                addNew={this.addNew}
                notification={this.state.notification}
                setNotification={this.setNotification}
                vote={this.vote} />
        <Footer />
      </Container>
    );
  }
}

export default App;
