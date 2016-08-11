Intervention Engine Frontend [![Build Status](https://api.travis-ci.org/intervention-engine/frontend-react.svg)](https://travis-ci.org/intervention-engine/frontend-react)
========================================================================================================================================================================

The [Intervention Engine](https://github.com/intervention-engine/ie) project provides a web-application for *data-driven team huddles*. Many care teams use team huddles to improve patient outcomes via efficient team communications and a holistic view of patients (due to the interdisciplinary nature of team huddles). Intervention Engine leverages electronic clinical records and clinical risk assessments to assist care teams in selecting patients for their huddles and providing the tools necessary to promote effective discussions and interventions.

Intervention Engine is a work in progress. Current Intervention Engine features:

-	custom population filters based on age, gender, conditions, and encounter types
-	clinical risk assessment integration via an open API
	-	prototype stroke risk calculation service (based on CHA2DS2-VASc)
	-	prototype "negative outcomes" risk calculation service (condition count + medication count)
-	patient views w/ summary data, risk trends, and risk component visualization
-	FHIR-based REST server
-	C-CDA import
- huddle management (scheduling, viewing, progressing)
- automated patient selection for huddles

Still to come:

-	intervention planning & tracking
-	population views and visualizations

The frontend Repository
-----------------------

The *frontend* repository contains the source code for the React Intervention Engine web application. This application communicates with the [ie](https://github.com/intervention-engine/ie) server and [riskservice](https://github.com/intervention-engine/riskservice) server to provide the Intervention Engine browser-based user interface.

Building and Running frontend Locally
-------------------------------------

Intervention Engine is a stack of tools and technologies. For information on installing and running the full stack, please see [Building and Running the Intervention Engine Stack in a Development Environment](https://github.com/intervention-engine/ie/blob/master/docs/dev_install.md).

In order for the *frontend* to work correctly, it is assumed that the [ie](https://github.com/intervention-engine/ie) and [riskservice](https://github.com/intervention-engine/riskservice) servers are already running.

For information related specifically to building and running the code in this repository (*frontend-react*), please refer to the following sections in the above guide:

-	(Prerequisite) [Install Git](https://github.com/intervention-engine/ie/blob/master/docs/dev_install.md#install-git)
-	(Prerequisite) [Install Node.js](https://github.com/intervention-engine/ie/blob/master/docs/dev_install.md#install-nodejs)
-	(Prerequisite for testing) [Install PhantomJS](https://github.com/intervention-engine/ie/blob/master/docs/dev_install.md#install-phantomjs)
-	[Clone frontend-react Repository](https://github.com/intervention-engine/ie/blob/master/docs/dev_install.md#clone-frontend-react-repository)
-	(Optional) [Create Intervention Engine User](https://github.com/intervention-engine/ie/blob/master/docs/dev_install.md#create-intervention-engine-user)
-	(Optional) [Generate and Upload Synthetic Patient Data](https://github.com/intervention-engine/ie/blob/master/docs/dev_install.md#generate-and-upload-synthetic-patient-data)

License
-------

Copyright 2016 The MITRE Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
