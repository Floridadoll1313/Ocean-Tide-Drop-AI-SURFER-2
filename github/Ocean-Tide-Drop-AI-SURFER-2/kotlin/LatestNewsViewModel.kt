package com.example.news

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.flow.SharingStarted

class LatestNewsViewModel(
    private val newsRepository: NewsRepository
) : ViewModel() {

    val uiState: StateFlow<LatestNewsUiState> =
        newsRepository.favoriteLatestNews
            .map<List<ArticleHeadline>, LatestNewsUiState> { LatestNewsUiState.Success(it) }
            .catch { emit(LatestNewsUiState.Error(it)) }
            .stateIn(
                scope = viewModelScope,
                started = SharingStarted.WhileSubscribed(5_000),
                initialValue = LatestNewsUiState.Loading
            )
}
