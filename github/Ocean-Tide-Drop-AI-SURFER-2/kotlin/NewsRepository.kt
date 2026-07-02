package com.example.news

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.launch
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

class NewsRepository(
    private val repoScope: CoroutineScope,
    private val remote: NewsRemoteDataSource,
    private val tickHandler: TickHandler,
) {

    // Internal cache exposed to consumers; repository controls updates
    private val _favoriteLatestNews = MutableStateFlow<List<ArticleHeadline>>(emptyList())
    val favoriteLatestNews: StateFlow<List<ArticleHeadline>> = _favoriteLatestNews

    init {
        // Use collectLatest so a new tick cancels any in-progress refresh
        repoScope.launch {
            tickHandler.tickFlow.collectLatest {
                try {
                    refreshLatestNews()
                } catch (t: Throwable) {
                    // Basic logging; replace with structured logger in your app
                    println("NewsRepository: refresh failed: ${t.message}")
                }
            }
        }
    }

    suspend fun refreshLatestNews() {
        // Fetch from remote and update internal cache atomically
        val fetched = remote.fetchLatest()
        // TODO: persist to local DB if needed
        _favoriteLatestNews.value = fetched
    }

    fun close() {
        repoScope.cancel()
    }

    companion object {
        /**
         * Create a repository with its own scope and wire `remote` and `tickHandler`
         * to that scope. Call `close()` when repository is no longer needed.
         */
        fun create(): NewsRepository {
            val scope = CoroutineScope(SupervisorJob() + Dispatchers.Default)
            val remote = NewsRemoteDataSource(scope)
            val tickHandler = TickHandler(scope)
            return NewsRepository(scope, remote, tickHandler)
        }
    }
}
