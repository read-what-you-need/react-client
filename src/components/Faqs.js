import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Row, Col } from 'reactstrap';


import { Player, BigPlayButton } from 'video-react';

import Navbar from './Nav/Railbar';


const Faqs = () => {
    return (

        <Container fluid style={{ paddingRight: 0, paddingLeft: 0 }}>

            <Row>

                <Col md="2">



                </Col>

                <Col md="9">
                    <div className="App">

                        <span className="read-page-header">Frequently Asked Questions <i class="twa twa-slightly-smiling-face"></i></span>

                        <div style={{ marginBottom: 50 }}></div>

                        <div className="faq-list">

                            <li>How to use the site ?</li>


                            <Player
                                playsInline
                                poster="/static/img/benj.jpg"
                                src="https://readneedobjects.s3.ap-south-1.amazonaws.com/rwunv02_2.mp4"
                            ><BigPlayButton position="center" /></Player>

                            <div style={{ marginBottom: 20 }}></div>

                            <li>How long does it usually take for the files to get processed ?</li>
                            <p>It can take anywhere between 10 to 30 minutes, given the servers are not overloaded with requests.</p>

                            <li>Will the files be accessible once they are processed ?</li>
                            <p>Yes, once processed files will be always available and can be accessed within 1 to 2 seconds</p>

                            <li>Will my pdf be stored ?</li>
                            <p>The pdf is not stored. Only the encodings of the pdf that are used to serve smart results will be stored.</p>

                            <li>Why use this?</li>
                            <p>To discover interesting content from files which are not easily searchable, so you can reach the ideas that click much sooner</p>

                            <li>How does this work ?</li>
                            <p>In the backend there's a simple semantic search that takes place on the sentence embeddings computed on the sentences from the whole pdf. The emebeddings are generated from a sentence transformer library built on top of hugging face. Citation below</p>

                            <li>Where was this created ?</li>
                            <p>This was created in Manipal under some shade of coconut trees <i class="twa  twa-palm-tree"></i> and a mix of beach vibes <i class="twa twa-beach-with-umbrella"></i></p>


                        </div>

                        <hr className="break-80" />


                        <span className="read-page-header">Built using</span>


                        <br />
                        <div className="faq-list">

                            <div style={{ marginBottom: 50 }}></div>
                            <code>
                                <li>
                                    Reimers, Nils and Gurevych, Iryna, Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks, (2019), GitHub repository, <a target="blank" href="https://github.com/UKPLab/sentence-transformers">Sentence Transformers</a>
                                </li>
                            </code>

                            <div style={{ marginBottom: 50 }}></div>

                            <code>
                                <li>Thomas Wolf and Lysandre Debut and Victor Sanh and Julien Chaumond and Clement Delangue and Anthony Moi and Pierric Cistac and Tim Rault and Rémi Louf and Morgan Funtowicz and Joe Davison and Sam Shleifer and Patrick von Platen and Clara Ma and Yacine Jernite and Julien Plu and Canwen Xu and Teven Le Scao and Sylvain Gugger and Mariama Drame and Quentin Lhoest and Alexander M. Rush, Transformers: State-of-the-Art Natural Language Processing, (2020), GitHub repository, <a target="blank" href="https://github.com/huggingface/transformers">Transformers</a></li>
                            </code>

                            <div style={{ marginBottom: 50 }}></div>

                            <code>
                                <li>Deploy machine learning models to production <a href="https://github.com/cortexlabs/cortex">Cortex.dev</a> </li>
                            </code>

                            <div style={{ marginBottom: 50 }}></div>

                        </div>





                    </div>
                </Col>
            </Row>

        </Container>

    );
}

export default Faqs;