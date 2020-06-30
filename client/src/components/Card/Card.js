import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Button } from 'react-bootstrap';


import { useState } from 'react'


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


function test(url) {
	console.log(url)
}


export default function ImageCard(props) {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const classes = useStyles();

	return (
		<>
			<Grid item key = {props.urlPath} xs = {6} sm = {4} md = {3}>
			    <Card className={classes.card}>
		         <button className="button-default" onClick={() => handleShow}>Show Modal</button>
			    	
			     <CardActionArea onClick = {(e) => (console.log(e))}>
			      <CardMedia 
			        className={classes.cardMedia}
			        image= {props.urlPath}
			        title="Image title"
			      />
			      </CardActionArea>
			    </Card>
	        </Grid>
        </>
	);

}

