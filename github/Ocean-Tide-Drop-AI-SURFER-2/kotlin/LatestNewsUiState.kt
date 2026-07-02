package com.example.news

sealed class LatestNewsUiState {
    object Loading : LatestNewsUiState()
    data class Success(val news: List<ArticleHeadline>) : LatestNewsUiState()
    data class Error(val exception: Throwable) : LatestNewsUiState()
}

// Placeholder domain model for examples. Remove or replace with your real model.
data class ArticleHeadline(
    val id: String = "",
    val title: String = "",
)
