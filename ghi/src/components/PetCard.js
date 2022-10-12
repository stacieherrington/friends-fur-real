import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function PetCard() {
  return (
    <div className="row row-cols-3 g-3 py-4">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Pet Name</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="secondary" size="sm">More info ...</Button>
        </Card.Body>
        <Card.Body>
          <Card.Link href="#">
            <Button variant="outline-success" size="sm">Adopt</Button>
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
  )
}

export default PetCard;