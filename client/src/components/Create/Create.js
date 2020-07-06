import React, {Component} from 'react';
import './Create.css';  
import ImageCard from "../Card/Card";


class Create extends Component {
    constructor(props) {

        super(props);

        this.state = {
            file: null,  
            file2: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
  }

  handleChange(event) {
    this.setState({
        file: URL.createObjectURL(event.target.files[0])
    });

    console.log(this.state.file)
  }

  handleChange2(event) {
    this.setState({
        file2: URL.createObjectURL(event.target.files[0])
    });
  }

  renderContentUpload() {
    if (this.props.content != null) return null
    return (
            <>
                <h4>Content Image: </h4>
                <input onChange = {this.handleChange} type = "file" name = "mypic" requried = "true"/> 
                <br/>
            </>
    )

  }

  renderStyleUpload() {
    if (this.props.style != null) return null
    return (
            <>
                <h4>Style Image: </h4>
                <input onChange = {this.handleChange2} type = "file" name = "mypic" requried = "true"/> <br/>
                <br/>
            </>
    )
  }

  render() {

    const path = "http://localhost:5000/"
    console.log(this.props.result);

    return (
        <>
            <form encType="multipart/form-data" action = "/" method="POST">
                { this.renderContentUpload() }
                { this.renderStyleUpload() }
                <input name = "content" hidden = "true" value = {this.props.content} />
                <input name = "style" hidden = "true" value = {this.props.style} />
                <button type="submit" value="submit">Submit</button>  <br/>
                <div className = "supportingImages">
                    { this.props.content != null && 
                        <ImageCard urlPath = {path.concat((this.props.content).replace("public/", ""))} />
                    }
                    { this.props.content == null && this.state.file != null &&
                        <ImageCard urlPath = {this.state.file} />
                    }

                    { this.props.style != null &&
                        <ImageCard urlPath = {path.concat((this.props.style).replace("public/", ""))} />
                    }  
                    { this.props.style == null && this.state.file2 != null &&
                        <ImageCard urlPath = {this.state.file2} />
                    }
                </div>
                <div className = "result">
                    { this.props.result != null &&
                        <ImageCard urlPath = {path.concat((this.props.result).replace("public/", ""))} />
                    }  
                </div>
            </form>
        </>

    );
  }
}

export default Create
