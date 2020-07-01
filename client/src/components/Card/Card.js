import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';


import { Button } from 'react-bootstrap';


import { useState } from 'react'

import Modal from 'react-bootstrap/Modal'


import './Card.css'


const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '100%', // 16:9
  },
}));



export default function ImageCard(props) {
  	const [show, setShow] = useState(false)
	const classes = useStyles()
	console.log(props.urlPath)

	return (
		<>
			<Grid item key = {props.urlPath} xs = {6} sm = {4} md = {3}>
			    <Card className={classes.card}>
			     <CardActionArea onClick = {() => setShow(true)}>
			      <CardMedia 
			        className={classes.cardMedia}
			        image= {props.urlPath}
			        title="Image title"
			      />
			      </CardActionArea>
			    </Card>
			    <Modal
		            show={show}
		            onHide={() => setShow(false)}
		            dialogClassName="test"
		            aria-labelledby="example-custom-modal-styling-title"
		          >
		            <Modal.Header closeButton>
		              <Modal.Title id="example-custom-modal-styling-title">
		                Create Custom Image
		              </Modal.Title>
		            </Modal.Header>
		            <Modal.Body>
		                <Card className={classes.card}>
							<CardActionArea>
							    <CardMedia 
									className={classes.cardMedia}
									image= {props.urlPath}
									title="Image title"
									/>
							    </CardActionArea>
		                </Card>
		                <Card className={classes.card}>
							<CardActionArea>
							    <CardMedia 
							    	onClick = {() => window.location = ('http://localhost:3000/?content=public/images/mypic-' + (props.urlPath).split("-")[0].split("result/")[1] + ".jpg")}
									className={classes.cardMedia}
									image= {"http://localhost:5000/images/mypic-" + (props.urlPath).split("-")[0].split("result/")[1] + ".jpg"}
									title="Image title"
									/>
							    </CardActionArea>
		                </Card>
		                <Card className={classes.card}>
							<CardActionArea>
							    <CardMedia 
							    	onClick = {() =>  window.location = ("http://localhost:3000/?style=public/images/mypic-" + (props.urlPath).split("-")[1].split(".")[0] + ".jpg")}
									className={classes.cardMedia}
									image= {"http://localhost:5000/images/mypic-" + (props.urlPath).split("-")[1].split(".")[0] + ".jpg"}
									title="Image title"
									/>
							    </CardActionArea>
		                </Card>
		            </Modal.Body>
		          </Modal>
	        </Grid>
        </>
	)

}

