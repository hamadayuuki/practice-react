import React, { useState, useEffect } from "react"
import axios from "./axios"
import { requests } from "./requests"

type Banner = {
    title?: string;
    name?: string;
    original_name?: string;
    backdrop_path?: string;
    overview?: string;
};