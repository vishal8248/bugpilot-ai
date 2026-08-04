import streamlit as st


def load_css():

    st.markdown(
        """
<style>

/* -----------------------------
Hide Streamlit Stuff
------------------------------*/

#MainMenu{
visibility:hidden;
}

footer{
visibility:hidden;
}

[data-testid="stToolbar"]{
display:none;
}

/* Keep header so sidebar works */

header{
background:transparent;
}

/* -----------------------------
Main App
------------------------------*/

.stApp{
background:#0E1117;
color:white;
}

/* -----------------------------
Main Container
------------------------------*/

.block-container{
padding-top:2rem;
padding-left:2rem;
padding-right:2rem;
max-width:100%;
}

/* -----------------------------
Sidebar
------------------------------*/

section[data-testid="stSidebar"]{

background:#161B22;

border-right:1px solid #30363D;
}

/* Sidebar Width */

section[data-testid="stSidebar"]{

width:260px !important;

}

/* -----------------------------
Buttons
------------------------------*/

.stButton>button{

width:100%;

border-radius:10px;

}

/* -----------------------------
Cards
------------------------------*/

div[data-testid="stMetric"]{

background:#161B22;

padding:18px;

border-radius:12px;

border:1px solid #30363D;

}

/* -----------------------------
Inputs
------------------------------*/

textarea,
input{

border-radius:10px !important;

}

/* -----------------------------
Divider
------------------------------*/

hr{

border-color:#30363D;

}

</style>
""",
        unsafe_allow_html=True,
    )