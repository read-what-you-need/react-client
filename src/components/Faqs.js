import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Row, Col } from 'reactstrap';

import Navbar from './Navbar';


const Faqs = () => {
    return (

        <Container fluid style={{ paddingRight: 0, paddingLeft: 0 }}>

            <Row>

                <Col md="2">

                 

                </Col>

                <Col md="8">
                    <div className="App">

                        <span className="read-page-header">Frequently Asked Questions <i class="twa twa-slightly-smiling-face"></i></span>

                        <div style={{ marginBottom: 50 }}></div>

                        <div className="faq-list">
                            <li>How long does it usually take for the results to show up ?</li>
                            <p>It can take anywhere between 10 seconds to 30 seconds, given the servers are not overloaded with requests.</p>

                            <li>What does 20% loaded in the results page mean ?</li>
                            <p>It means only 20% of the pdf is scanned uniformly and results are shown from that. This 10% limit on pdf is set, mainly because this a demo version to test the product.</p>

                            <li>Will my pdf be stored ?</li>
                            <p>The pdf is not stored. Only the encodings of the pdf that are used to serve smart results will be stored till tonight, after which they will be deleted.</p>

                            <li>How to get 100% results shown for a pdf?</li>
                            <p>If handful of people are interested to obtain full results, then we can start to rollout features that serve those needs.</p>

                            <li>Why cannot we share the results page link to our friends ?</li>
                            <p>This is just a demo test product, if more people are interested, we will work on rolling out this feature too. Let us know about it by filling out the feedback form 😄 !</p>

                            <li>Why use this?</li>
                            <p>It mainly originates to discover nuggets of gold that lay hidden within books and access them quickly.</p>

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